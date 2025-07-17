import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';
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
  };
}

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
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

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
