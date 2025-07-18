import request from 'supertest';
import app from '../../../index';
import { User } from '../../../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { requireEnv } from '../../../utils/env';

describe('Auth Me Routes', () => {
  const JWT_SECRET = requireEnv('JWT_SECRET');

  afterEach(async () => {
    await User.destroy({ where: {} });
  });

  describe('GET /api/auth/me', () => {
    let testUser: InstanceType<typeof User>;
    let validToken: string;

    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash('Password123!', 10);
      testUser = await User.create({
        email: 'test@example.com',
        password: hashedPassword,
      });

      const payload = {
        id: testUser.getDataValue('id'),
        email: testUser.getDataValue('email'),
      };
      validToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    });

    it('should return user info when valid token is provided', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Cookie', `token=${validToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty(
        'id',
        testUser.getDataValue('id')
      );
      expect(response.body.user).toHaveProperty(
        'email',
        testUser.getDataValue('email')
      );
      expect(response.body.user).toHaveProperty('createdAt');
      expect(response.body.user).toHaveProperty('updatedAt');
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('should return 401 when no token is provided', async () => {
      const response = await request(app).get('/api/auth/me').expect(401);

      expect(response.body).toHaveProperty('error', 'Access token required');
    });

    it('should return 401 when invalid token is provided', async () => {
      const invalidToken = 'invalid.token.here';

      const response = await request(app)
        .get('/api/auth/me')
        .set('Cookie', `token=${invalidToken}`)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Invalid token');
    });

    it('should return 401 when token is expired', async () => {
      const expiredPayload = {
        id: testUser.getDataValue('id'),
        email: testUser.getDataValue('email'),
      };
      const expiredToken = jwt.sign(expiredPayload, JWT_SECRET, {
        expiresIn: '-1h',
      });

      const response = await request(app)
        .get('/api/auth/me')
        .set('Cookie', `token=${expiredToken}`)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Token expired');
    });

    it('should return 401 when user no longer exists in database', async () => {
      const payload = {
        id: testUser.getDataValue('id'),
        email: testUser.getDataValue('email'),
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

      await testUser.destroy();

      const response = await request(app)
        .get('/api/auth/me')
        .set('Cookie', `token=${token}`)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'User not found');
    });

    it('should return 401 when token has wrong user ID', async () => {
      const wrongPayload = { id: 99999, email: testUser.getDataValue('email') };
      const wrongToken = jwt.sign(wrongPayload, JWT_SECRET, {
        expiresIn: '7d',
      });

      const response = await request(app)
        .get('/api/auth/me')
        .set('Cookie', `token=${wrongToken}`)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'User not found');
    });

    it('should handle token with different cookie name', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Cookie', `otherCookie=${validToken}`)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Access token required');
    });

    it('should handle multiple cookies with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Cookie', [
          `otherCookie=value`,
          `token=${validToken}`,
          `anotherCookie=value2`,
        ])
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty(
        'id',
        testUser.getDataValue('id')
      );
    });

    it('should return user data in correct format', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Cookie', `token=${validToken}`)
        .expect(200);

      const user = response.body.user;

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');

      expect(typeof user.id).toBe('number');
      expect(typeof user.email).toBe('string');
      expect(user.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
      expect(user.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);

      expect(user).not.toHaveProperty('password');
    });

    it('should work with token created from login endpoint', async () => {
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Password123!',
        })
        .expect(200);

      const loginCookies = loginResponse.headers['set-cookie'];
      expect(loginCookies).toBeDefined();

      const meResponse = await request(app)
        .get('/api/auth/me')
        .set('Cookie', loginCookies!)
        .expect(200);

      expect(meResponse.body).toHaveProperty('user');
      expect(meResponse.body.user).toHaveProperty(
        'id',
        testUser.getDataValue('id')
      );
      expect(meResponse.body.user).toHaveProperty(
        'email',
        testUser.getDataValue('email')
      );
    });

    it('should handle malformed JWT tokens', async () => {
      const malformedToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.signature';

      const response = await request(app)
        .get('/api/auth/me')
        .set('Cookie', `token=${malformedToken}`)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Invalid token');
    });

    it('should handle empty token value', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Cookie', 'token=')
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Access token required');
    });

    it('should handle token with wrong secret', async () => {
      const wrongSecretToken = jwt.sign(
        {
          id: testUser.getDataValue('id'),
          email: testUser.getDataValue('email'),
        },
        'wrong-secret',
        { expiresIn: '7d' }
      );

      const response = await request(app)
        .get('/api/auth/me')
        .set('Cookie', `token=${wrongSecretToken}`)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Invalid token');
    });
  });
});
