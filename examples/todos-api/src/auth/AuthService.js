// Authentication Service - JWT with RS256
// Replaces placeholder auth middleware

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const privateKey = process.env.JWT_PRIVATE_KEY || 'dummy-private-key';
const publicKey = process.env.JWT_PUBLIC_KEY || 'dummy-public-key';
const tokenExpiry = '15m';
const refreshTokenExpiry = '7d';

class AuthService {
  constructor() {
    this.signAsync = promisify(jwt.sign);
    this.verifyAsync = promisify(jwt.verify);
  }

  async generateTokens(userId, email, role = 'user') {
    const payload = {
      sub: userId,
      email,
      role,
      iat: Math.floor(Date.now() / 1000)
    };

    const accessToken = await this.signAsync(payload, {
      algorithm: 'RS256',
      expiresIn: tokenExpiry,
      key: privateKey
    });

    const refreshToken = await this.signAsync(payload, {
      algorithm: 'RS256',
      expiresIn: refreshTokenExpiry,
      key: privateKey
    });

    return { accessToken, refreshToken };
  }

  async verifyToken(token) {
    try {
      const decoded = await this.verifyAsync(token, {
        algorithms: ['RS256'],
        key: publicKey
      });
      return decoded;
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid token');
      }
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired');
      }
      throw error;
    }
  }

  async refreshTokens(refreshToken) {
    const decoded = await this.verifyToken(refreshToken);
    return await this.generateTokens(decoded.sub, decoded.email, decoded.role);
  }
}

// Middleware factory
function createAuthMiddleware(authService) {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid token', code: 'MISSING_TOKEN' });
      }

      const token = authHeader.slice(7);
      const decoded = await authService.verifyToken(token);

      // Attach user context
      req.user = {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role
      };

      next();
    } catch (error) {
      logger.error('Auth failed', { error: error.message, route: req.originalUrl });
      res.status(401).json({ error: 'Authentication failed', code: 'AUTH_FAILED' });
    }
  };
}

module.exports = { AuthService, createAuthMiddleware };
