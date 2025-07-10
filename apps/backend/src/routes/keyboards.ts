import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

// Validation schemas
const createKeyboardSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().nullable().optional(),
  price: z.number().positive('Price must be positive'),
  brand: z.string().min(1, 'Brand is required'),
  layout: z.string().min(1, 'Layout is required'),
  switches: z.string().nullable().optional(),
  keycaps: z.string().nullable().optional(),
  wireless: z.boolean().default(false),
  rgb: z.boolean().default(false),
  imageUrl: z.string().url().nullable().optional(),
  inStock: z.boolean().default(true),
  stockCount: z.number().int().min(0).default(0),
});

const updateKeyboardSchema = createKeyboardSchema.partial();

// GET /api/keyboards - Get all keyboards
router.get('/', async (_req, res, next) => {
  try {
    const keyboards = await prisma.keyboard.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(keyboards);
  } catch (error) {
    return next(error);
  }
});

// GET /api/keyboards/:id - Get keyboard by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const keyboard = await prisma.keyboard.findUnique({
      where: { id },
    });

    if (!keyboard) {
      return res.status(404).json({ error: 'Keyboard not found' });
    }

    return res.json(keyboard);
  } catch (error) {
    return next(error);
  }
});

// POST /api/keyboards - Create new keyboard
router.post('/', async (req, res, next) => {
  try {
    const validatedData = createKeyboardSchema.parse(req.body);
    // Convert undefined to null for nullable fields
    const data = {
      ...validatedData,
      description: validatedData.description ?? null,
      switches: validatedData.switches ?? null,
      keycaps: validatedData.keycaps ?? null,
      imageUrl: validatedData.imageUrl ?? null,
    };
    const keyboard = await prisma.keyboard.create({
      data,
    });
    return res.status(201).json(keyboard);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.errors,
      });
    }
    return next(error);
  }
});

// PUT /api/keyboards/:id - Update keyboard
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const validatedData = updateKeyboardSchema.parse(req.body);
    // Only include fields that are defined, and convert nullable fields to null if explicitly set
    const data: Record<string, unknown> = {};
    const validatedObj = validatedData as Record<string, unknown>;
    for (const key in validatedObj) {
      if (
        validatedObj[key] !== undefined &&
        ['description', 'switches', 'keycaps', 'imageUrl'].includes(key)
      ) {
        data[key] = validatedObj[key] === undefined ? null : validatedObj[key];
      } else if (validatedObj[key] !== undefined) {
        data[key] = validatedObj[key];
      }
    }
    const keyboard = await prisma.keyboard.update({
      where: { id },
      data,
    });
    return res.json(keyboard);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.errors,
      });
    }
    if (
      error instanceof Error &&
      error.message.includes('Record to update not found')
    ) {
      return res.status(404).json({ error: 'Keyboard not found' });
    }
    return next(error);
  }
});

// DELETE /api/keyboards/:id - Delete keyboard
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.keyboard.delete({
      where: { id },
    });
    return res.status(204).send();
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('Record to delete does not exist')
    ) {
      return res.status(404).json({ error: 'Keyboard not found' });
    }
    return next(error);
  }
});

export { router as keyboardRoutes };
