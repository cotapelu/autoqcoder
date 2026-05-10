// Todos API - Production-ready example demonstrating AGENTS.md v1.5
// This is a skeleton showing structure; full implementation in real project

require('dotenv').config();
const express = require('express');
const pino = require('pino');
const pinoHttp = require('pino-http');
const { createClient } = require('ioredis');
const { Pool } = require('pg');

// Initialize structured logger
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'production' ? { target: 'pino-pretty' } : undefined
});

// Metrics collection (Prometheus)
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ prefix: 'todos_api_' });

const customMetrics = {
  todosCreated: new client.Counter({ name: 'todos_created_total', help: 'Total todos created' }),
  todosUpdated: new client.Counter({ name: 'todos_updated_total', help: 'Total todos updated' }),
  todosDeleted: new client.Counter({ name: 'todos_deleted_total', help: 'Total todos deleted' }),
  httpRequests: new client.Counter({ name: 'http_requests_total', help: 'Total HTTP requests', labelNames: ['method', 'route', 'status'] }),
  httpDuration: new client.Histogram({ name: 'http_request_duration_seconds', help: 'HTTP request duration', labelNames: ['route'] })
};

// Database connection pool with resilience
const dbPool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 20, // Connection pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

// Redis client for rate limiting & caching
const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

redisClient.on('error', (err) => logger.error('Redis error', { error: err.message }));
redisClient.connect().catch(console.error);

const app = express();

// Middleware
app.use(express.json());
app.use(pinoHttp({ logger }));

// Add correlation ID to each request
app.use((req, res, next) => {
  req.id = Math.random().toString(36).substr(2, 9);
  next();
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.mimeType);
    res.end(await client.register.metrics());
  } catch (err) {
    logger.error('Metrics error', { error: err.message });
    res.status(500).end(err.message);
  }
});

// Health check endpoint
app.get('/health', async (req, res) => {
  const health = { status: 'ok', timestamp: new Date().toISOString() };
  try {
    // Check database
    await dbPool.query('SELECT 1');
    health.database = 'ok';
  } catch (err) {
    health.database = 'down';
    health.status = 'degraded';
  }
  try {
    await redisClient.ping();
    health.redis = 'ok';
  } catch (err) {
    health.redis = 'down';
    health.status = 'degraded';
  }
  res.status(health.status === 'ok' ? 200 : 503).json(health);
});

// Placeholder auth middleware (JWT verification)
function authMiddleware(req, res, next) {
  // TODO: Implement JWT verification with RS256
  logger.warn('Auth middleware not implemented - placeholder used');
  req.user = { id: 'user123', email: 'demo@example.com', role: 'user' };
  next();
}

// Placeholder rate limiting
function rateLimitMiddleware(req, res, next) {
  // TODO: Implement Redis-backed rate limiting (5 req/min)
  logger.warn('Rate limit not implemented - placeholder used');
  next();
}

// Health check endpoint
app.get('/health', async (req, res) => {
  const health = { status: 'ok', timestamp: new Date().toISOString() };
  try {
    await dbPool.query('SELECT 1');
    health.database = 'ok';
  } catch (err) {
    health.database = 'down';
    health.status = 'degraded';
  }
  res.status(health.status === 'ok' ? 200 : 503).json(health);
});

// Todo routes (structure only)
const todoRouter = require('./routes/todos');
app.use('/api/v1/todos', rateLimitMiddleware, authMiddleware, todoRouter);

// Error handling middleware (last)
app.use((err, req, res, next) => {
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
    requestId: req.id
  });
  res.status(500).json({
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
    requestId: req.id
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(async () => {
    await dbPool.end();
    await redisClient.quit();
    process.exit(0);
  });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  logger.info(`Todos API listening on port ${PORT}`, { version: '1.0.0' });
  console.log(`🚀 Todos API running on http://localhost:${PORT}`);
  console.log('📊 Metrics: http://localhost:3000/metrics');
  console.log('💚 Health: http://localhost:3000/health');
});

module.exports = { app, server };