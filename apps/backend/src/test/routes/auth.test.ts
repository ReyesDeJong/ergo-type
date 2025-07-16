import request from 'supertest';
import app from '../../index';
import { User } from '../../models';
import sequelize from '../../config/database';

describe('Auth Routes', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await User.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /api/auth/signup', () => {
    it('should create a new user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'Password123!',
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user).not.toHaveProperty('password');
      expect(response.body.user).toHaveProperty('createdAt');
      expect(response.body.user).toHaveProperty('updatedAt');

      const savedUser = await User.findByPk(response.body.user.id);
      expect(savedUser).toBeTruthy();
      expect(savedUser?.get('email')).toBe(userData.email);
      expect(savedUser?.get('password')).not.toBe(userData.password);
    });

    it('should return 400 for invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'Password123!',
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
      expect(response.body.fields).toBeDefined();
    });

    it('should return 400 for password too short', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'Pass1!',
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
      expect(response.body.fields).toBeDefined();
    });

    it('should return 400 for password without number', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'Password!',
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
      expect(response.body.fields).toBeDefined();
    });

    it('should return 400 for password without capital letter', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123!',
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
      expect(response.body.fields).toBeDefined();
    });

    it('should return 400 for password without symbol', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'Password123',
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
      expect(response.body.fields).toBeDefined();
    });

    it('should handle duplicate email gracefully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'Password123!',
      };

      // Create first user
      await request(app).post('/api/auth/signup').send(userData).expect(201);

      // Try to create second user with same email
      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain(
        "If an account with this email doesn't exist"
      );

      // Check that there is only one user with this email in the database
      const usersWithEmail = await User.findAll({
        where: { email: userData.email },
      });
      expect(usersWithEmail.length).toBe(1);
    });

    it('should return 400 for missing email', async () => {
      const userData = {
        password: 'Password123!',
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
    });

    it('should return 400 for missing password', async () => {
      const userData = {
        email: 'test@example.com',
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
    });

    it('should accept various valid password formats', async () => {
      const validPasswords = [
        'Password123!',
        'MyPass1@',
        'Secure2#',
        'TestPass3$',
        'Complex4%',
      ];

      for (const password of validPasswords) {
        const userData = {
          email: `test-${Date.now()}@example.com`,
          password,
        };

        const response = await request(app)
          .post('/api/auth/signup')
          .send(userData)
          .expect(201);

        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('user');
      }
    });
  });
});
