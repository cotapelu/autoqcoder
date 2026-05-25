// Dependency Injection - App Bootstrap
// Wire up all services following repository pattern

const { Pool } = require('pg');
const Redis = require('ioredis');
const { TodoRepository } = require('../db/TodoRepository');
const { TodoService } = require('../db/TodoService');
const { AuthService, createAuthMiddleware } = require('../auth/AuthService');
const { createRateLimiter } = require('../middleware/rateLimiter');
const logger = require('../logger');

class AppBootstrap {
  static async initialize() {
    // 1. Database pool
    const dbPool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000
    });

    // Test connection
    await dbPool.query('SELECT 1');
    logger.info('Database connected');

    // 2. Redis client
    const redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD
    });
    redisClient.on('error', (err) => logger.error('Redis error', { error: err.message }));
    await redisClient.ping();
    logger.info('Redis connected');

    // 3. Repositories
    const todoRepository = new TodoRepository(dbPool);

    // 4. Services
    const todoService = new TodoService(todoRepository);
    const authService = new AuthService();

    // 5. Middleware
    const authMiddleware = createAuthMiddleware(authService);
    const rateLimiter = createRateLimiter(redisClient, {
      windowMs: 60 * 1000,
      maxRequests: 5
    });

    return {
      dbPool,
      redisClient,
      todoRepository,
      todoService,
      authService,
      authMiddleware,
      rateLimiter,
      logger
    };
  }

  static async shutdown(services) {
    logger.info('Shutting down...');
    if (services.dbPool) await services.dbPool.end();
    if (services.redisClient) await services.redisClient.quit();
    logger.info('Shutdown complete');
  }
}

module.exports = { AppBootstrap };
