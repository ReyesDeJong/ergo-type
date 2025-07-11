import request from 'supertest';
import app from '../index';
import { Keyboard } from '../models';
import sequelize from '../config/database';

describe('Keyboard API', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await Keyboard.destroy({ where: {} });
  });

  describe('GET /api/keyboards', () => {
    it('should return empty array when no keyboards exist', async () => {
      const response = await request(app).get('/api/keyboards');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all keyboards', async () => {
      const keyboard = await Keyboard.create({
        name: 'Test Keyboard',
      });
      const keyboardId = keyboard.get('id');

      const response = await request(app).get('/api/keyboards');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].id).toBe(keyboardId);
      expect(response.body[0].name).toBe('Test Keyboard');
    });
  });

  describe('GET /api/keyboards/:id', () => {
    it('should return 404 for non-existent keyboard', async () => {
      const response = await request(app).get('/api/keyboards/999');
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Keyboard not found');
    });

    it('should return keyboard by id', async () => {
      const keyboard = await Keyboard.create({
        name: 'Test Keyboard',
      });
      const keyboardId = keyboard.get('id');

      const response = await request(app).get(`/api/keyboards/${keyboardId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(keyboardId);
      expect(response.body.name).toBe('Test Keyboard');
    });
  });

  describe('POST /api/keyboards', () => {
    it('should create a new keyboard', async () => {
      const keyboardData = {
        name: 'Ergonomic Split Keyboard',
      };

      const response = await request(app)
        .post('/api/keyboards')
        .send(keyboardData);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(keyboardData.name);
      expect(response.body.id).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        name: '',
      };

      const response = await request(app)
        .post('/api/keyboards')
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation error');
    });
  });

  describe('PUT /api/keyboards/:id', () => {
    it('should update keyboard', async () => {
      const keyboard = await Keyboard.create({
        name: 'Original Name',
      });
      const keyboardId = keyboard.get('id');

      const updateData = {
        name: 'Updated Name',
      };

      const response = await request(app)
        .put(`/api/keyboards/${keyboardId}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated Name');
    });

    it('should return 404 for non-existent keyboard', async () => {
      const response = await request(app)
        .put('/api/keyboards/999')
        .send({ name: 'Updated Name' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Keyboard not found');
    });
  });

  describe('DELETE /api/keyboards/:id', () => {
    it('should delete keyboard', async () => {
      const keyboard = await Keyboard.create({
        name: 'Test Keyboard',
      });
      const keyboardId = keyboard.get('id');

      const response = await request(app).delete(
        `/api/keyboards/${keyboardId}`
      );
      expect(response.status).toBe(204);

      const getResponse = await request(app).get(
        `/api/keyboards/${keyboardId}`
      );
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent keyboard', async () => {
      const response = await request(app).delete('/api/keyboards/999');
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Keyboard not found');
    });
  });
});
