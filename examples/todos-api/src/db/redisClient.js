// Redis client singleton
const Redis = require('ioredis');

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times) => {
    if (times > 3) return null; // Stop after 3 retries
    return Math.min(times * 50, 2000);
  }
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err.message);
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

module.exports = redisClient;
