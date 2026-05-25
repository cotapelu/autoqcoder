// Rate Limiting Middleware - Redis-backed
// Replaces placeholder with real implementation

const redisClient = require('../db/redisClient'); //假设 có file redisClient

class RateLimiter {
  constructor(redis, options = {}) {
    this.redis = redis;
    this.windowMs = options.windowMs || 60 * 1000; // 1 minute
    this.maxRequests = options.maxRequests || 5; // 5 requests per minute
    this.keyPrefix = options.keyPrefix || 'rate_limit:';
  }

  async middleware(req, res, next) {
    try {
      const userId = req.user?.id || req.ip;
      const route = req.route?.path || req.path;
      const key = `${this.keyPrefix}${userId}:${route}`;

      const current = await this.redis.incr(key);

      if (current === 1) {
        await this.redis.pexpire(key, this.windowMs);
      }

      const remaining = Math.max(0, this.maxRequests - current);
      res.set('X-RateLimit-Limit', this.maxRequests.toString());
      res.set('X-RateLimit-Remaining', remaining.toString());

      if (current > this.maxRequests) {
        const retryAfter = await this.redis.pttl(key);
        res.set('Retry-After', Math.ceil(retryAfter / 1000).toString());
        return res.status(429).json({
          error: 'Too many requests',
          code: 'RATE_LIMIT_EXCEEDED',
          retryAfter: Math.ceil(retryAfter / 1000)
        });
      }

      next();
    } catch (error) {
      logger.error('Rate limit error', { error: error.message, route: req.originalUrl });
      // Fail open: allow request if rate limiter fails
      next();
    }
  }
}

// Factory function
function createRateLimiter(redis, options) {
  const limiter = new RateLimiter(redis, options);
  return async (req, res, next) => limiter.middleware(req, res, next);
}

module.exports = { RateLimiter, createRateLimiter };
