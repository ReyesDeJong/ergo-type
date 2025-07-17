import request from 'supertest';
import app from '../../index';
import { User } from '../../models';
import bcrypt from 'bcrypt';

describe('Auth Login Routes', () => {
  afterEach(async () => {
    await User.destroy({ where: {} });
  });

  describe('POST /api/auth/login', () => {
    let testUser: InstanceType<typeof User>;

    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash('Password123!', 10);
      testUser = await User.create({
        email: 'test@example.com',
        password: hashedPassword,
      });
    });

    it('should login successfully with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'Password123!',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.email).toBe(loginData.email);
      expect(response.body.user).not.toHaveProperty('password');

      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies).toHaveLength(1);
      expect(cookies![0]).toContain('token=');
      expect(cookies![0]).toContain('HttpOnly');
    });

    it('should return 401 for invalid email', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'Password123!',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });

    it('should return 401 for invalid password', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'WrongPassword123!',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });

    it('should return 400 for invalid email format', async () => {
      const loginData = {
        email: 'invalid-email',
        password: 'Password123!',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
      expect(response.body.fields).toHaveProperty('email');
    });

    it('should return 400 for missing email', async () => {
      const loginData = {
        password: 'Password123!',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
      expect(response.body.fields).toHaveProperty('email');
    });

    it('should return 400 for missing password', async () => {
      const loginData = {
        email: 'test@example.com',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
      expect(response.body.fields).toHaveProperty('password');
    });

    it('should return 400 for empty password', async () => {
      const loginData = {
        email: 'test@example.com',
        password: '',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
      expect(response.body.fields).toHaveProperty('password');
    });

    it('should set secure cookie in production environment', async () => {
      const originalEnv = process.env['NODE_ENV'];
      process.env['NODE_ENV'] = 'production';

      const loginData = {
        email: 'test@example.com',
        password: 'Password123!',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      const cookies = response.headers['set-cookie'];
      expect(cookies![0]).toContain('Secure');

      // Restore original environment
      process.env['NODE_ENV'] = originalEnv;
    });

    it('should return user data without password', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'Password123!',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      const user = response.body.user;
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
      expect(user).not.toHaveProperty('password');
      expect(user.id).toBe(testUser.getDataValue('id'));
      expect(user.email).toBe(testUser.getDataValue('email'));
    });

    it('should handle multiple login attempts with same credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'Password123!',
      };

      const response1 = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      const response2 = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response1.body.user.id).toBe(response2.body.user.id);
      expect(response1.headers['set-cookie']).toBeDefined();
      expect(response2.headers['set-cookie']).toBeDefined();
    });
  });
});
