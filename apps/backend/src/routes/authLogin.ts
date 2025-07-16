import { Router, Response, CookieOptions } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { requireEnv } from '../utils/env';

const router = Router();

const JWT_SECRET = requireEnv('JWT_SECRET');
const JWT_EXPIRES_IN = '7d';

const getCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: process.env['NODE_ENV'] === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

const createJWTToken = (userId: number, email: string): string => {
  const payload = { id: userId, email };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const setAuthCookie = (res: Response, token: string): void => {
  res.cookie('token', token, getCookieOptions());
};

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const getFieldErrorMessage = (field: string, message: string): string => {
  const customMessages: Record<string, string> = {
    email: 'Please enter a valid email address',
    password: 'Password is required',
  };
  return customMessages[field] || message;
};

router.post('/login', async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.getDataValue('password')
    );
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const userId = user.getDataValue('id');
    const userEmail = user.getDataValue('email');
    const token = createJWTToken(userId, userEmail);

    setAuthCookie(res, token);

    const userData = user.toJSON();
    const userResponse = {
      id: userData.id,
      email: userData.email,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };

    return res.status(200).json({ user: userResponse });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.reduce(
        (acc, err) => {
          const field = err.path.join('.');
          acc[field] = getFieldErrorMessage(field, err.message);
          return acc;
        },
        {} as Record<string, string>
      );
      return res.status(400).json({
        error: 'Validation error',
        fields: fieldErrors,
      });
    }
    return next(error);
  }
});

export { router as loginRoutes };
