import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { User } from '../models';

const authSignupRoutes = Router();

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[0-9]/, 'Password must contain at least 1 number')
    .regex(/[A-Z]/, 'Password must contain at least 1 capital letter')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least 1 symbol'),
});

// Custom error messages for better UX
const getFieldErrorMessage = (field: string, message: string): string => {
  const customMessages: Record<string, string> = {
    email: 'Please enter a valid email address',
    password:
      'Password must be at least 8 characters and contain uppercase, lowercase, number, and symbol',
  };

  return customMessages[field] || message;
};

// POST /api/auth/signup - Create new user account
authSignupRoutes.post('/signup', async (req, res, next) => {
  try {
    const validatedData = signupSchema.parse(req.body);
    const { email, password } = validatedData;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(201).json({
        message:
          "If an account with this email doesn't exist, it has been created successfully",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    const userData = user.toJSON();
    const userResponse = {
      id: userData.id,
      email: userData.email,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };

    return res.status(201).json({
      message:
        "If an account with this email doesn't exist, it has been created successfully",
      user: userResponse,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Transform Zod errors to field-specific format with custom messages
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

export { authSignupRoutes };
