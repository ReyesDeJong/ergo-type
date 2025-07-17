import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { User } from '../models';
import UserModel from '../models/User';
import { requireEnv } from '../utils/env';

const router = Router();

const JWT_SECRET = requireEnv('JWT_SECRET');

interface JWTPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    userData: UserModel;
  };
}

const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies['token'];

    if (!token) {
      res.status(401).json({ error: 'Access token required' });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    const user = await User.findByPk(decoded.id);
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
      userData: user,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expired' });
      return;
    }
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    if (error instanceof SyntaxError) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    next(error);
  }
};

// GET /api/auth/me - Get current user info
router.get(
  '/me',
  authRateLimit,
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const user = req.user.userData;
      const userData = user.toJSON();
      const userResponse = {
        id: userData.id,
        email: userData.email,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      };

      return res.status(200).json({ user: userResponse });
    } catch (error) {
      return next(error);
    }
  }
);

export { router as authMeRoutes };
