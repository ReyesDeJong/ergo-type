import request from 'supertest';
import app from '../../index';
import { User } from '../../models';
import type { UserAttributes } from '../../models/User';

import jwt from 'jsonwebtoken';
import { requireEnv } from '../../utils/env';

const JWT_SECRET = requireEnv('JWT_SECRET');

describe('Rate limiting on /api/auth/me', () => {
  let token: string;
  let user: UserAttributes & { id: number; email: string };

  beforeAll(async () => {
    user = (await User.create({
      email: 'ratelimit@example.com',
      password: 'testpassword123',
    })) as unknown as UserAttributes & { id: number; email: string };
    token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });
  });

  afterAll(async () => {
    await User.destroy({ where: { id: user.id } });
  });

  it('should return 429 after exceeding the rate limit', async () => {
    const agent = request.agent(app);
    let lastRes: request.Response;
    for (let i = 0; i < 101; i++) {
      lastRes = await agent
        .get('/api/auth/me')
        .set('Cookie', [`token=${token}`]);
    }
    expect(lastRes!.status).toBe(429);
    expect(lastRes!.body).toHaveProperty(
      'error',
      'Too many requests from this IP, please try again later.'
    );
  });
});
