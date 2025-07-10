import request from 'supertest';
import app from '../index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Keyboard API', () => {
  beforeEach(async () => {
    await prisma.keyboard.deleteMany();
  });

  describe('GET /api/keyboards', () => {
    it('should return empty array when no keyboards exist', async () => {
      const response = await request(app).get('/api/keyboards');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all keyboards', async () => {
      const keyboard = await prisma.keyboard.create({
        data: {
          name: 'Test Keyboard',
          price: 199.99,
          brand: 'Test Brand',
          layout: 'split',
        },
      });

      const response = await request(app).get('/api/keyboards');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].id).toBe(keyboard.id);
    });
  });

  describe('GET /api/keyboards/:id', () => {
    it('should return 404 for non-existent keyboard', async () => {
      const response = await request(app).get('/api/keyboards/non-existent-id');
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Keyboard not found');
    });

    it('should return keyboard by id', async () => {
      const keyboard = await prisma.keyboard.create({
        data: {
          name: 'Test Keyboard',
          price: 199.99,
          brand: 'Test Brand',
          layout: 'split',
        },
      });

      const response = await request(app).get(`/api/keyboards/${keyboard.id}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(keyboard.id);
      expect(response.body.name).toBe('Test Keyboard');
    });
  });

  describe('POST /api/keyboards', () => {
    it('should create a new keyboard', async () => {
      const keyboardData = {
        name: 'Ergonomic Split Keyboard',
        description: 'A comfortable split keyboard for long typing sessions',
        price: 299.99,
        brand: 'ErgoType',
        layout: 'split',
        switches: 'cherry-mx-brown',
        keycaps: 'PBT',
        wireless: true,
        rgb: false,
        inStock: true,
        stockCount: 10,
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
        name: '', // Invalid: empty name
        price: -10, // Invalid: negative price
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
      const keyboard = await prisma.keyboard.create({
        data: {
          name: 'Original Name',
          price: 199.99,
          brand: 'Test Brand',
          layout: 'split',
        },
      });

      const updateData = {
        name: 'Updated Name',
        price: 299.99,
      };

      const response = await request(app)
        .put(`/api/keyboards/${keyboard.id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated Name');
      expect(response.body.price).toBe(299.99);
    });

    it('should return 404 for non-existent keyboard', async () => {
      const response = await request(app)
        .put('/api/keyboards/non-existent-id')
        .send({ name: 'Updated Name' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Keyboard not found');
    });
  });

  describe('DELETE /api/keyboards/:id', () => {
    it('should delete keyboard', async () => {
      const keyboard = await prisma.keyboard.create({
        data: {
          name: 'Test Keyboard',
          price: 199.99,
          brand: 'Test Brand',
          layout: 'split',
        },
      });

      const response = await request(app).delete(
        `/api/keyboards/${keyboard.id}`
      );
      expect(response.status).toBe(204);

      // Verify it's deleted
      const getResponse = await request(app).get(
        `/api/keyboards/${keyboard.id}`
      );
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent keyboard', async () => {
      const response = await request(app).delete(
        '/api/keyboards/non-existent-id'
      );
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Keyboard not found');
    });
  });
});
