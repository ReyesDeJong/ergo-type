import { Router } from 'express';
import { z } from 'zod';
import { Keyboard } from '../models';

const router = Router();

const createKeyboardSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

const updateKeyboardSchema = createKeyboardSchema.partial();

const isValidId = (id: string): boolean => {
  const numId = parseInt(id, 10);
  return !isNaN(numId) && numId > 0;
};

// GET /api/keyboards - Get all keyboards
router.get('/', async (_req, res, next) => {
  try {
    const keyboards = await Keyboard.findAll({
      order: [['createdAt', 'DESC']],
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

    if (!isValidId(id)) {
      return res.status(400).json({ error: 'Invalid keyboard ID' });
    }

    const keyboard = await Keyboard.findByPk(parseInt(id, 10));
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
    const keyboard = await Keyboard.create(validatedData);
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

    // Check if ID is a valid integer
    if (!isValidId(id)) {
      return res.status(404).json({ error: 'Keyboard not found' });
    }

    const validatedData = updateKeyboardSchema.parse(req.body);
    const keyboard = await Keyboard.findByPk(parseInt(id, 10));
    if (!keyboard) {
      return res.status(404).json({ error: 'Keyboard not found' });
    }

    const updateData = Object.fromEntries(
      Object.entries(validatedData).filter(([, value]) => value !== undefined)
    );

    await keyboard.update(updateData);
    return res.json(keyboard);
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

// DELETE /api/keyboards/:id - Delete keyboard
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(404).json({ error: 'Keyboard not found' });
    }

    const keyboard = await Keyboard.findByPk(parseInt(id, 10));
    if (!keyboard) {
      return res.status(404).json({ error: 'Keyboard not found' });
    }
    await keyboard.destroy();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

export { router as keyboardRoutes };
