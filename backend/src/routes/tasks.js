import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth.js';
import Task from '../models/Task.js';

const router = Router();
router.use(requireAuth);

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().default(''),
  status: z.enum(['todo', 'in_progress', 'done']).optional()
});

router.get('/', async (req, res, next) => {
  try {
    const { q, status, page = 1, limit = 10 } = req.query;
    const filter = { userId: req.userId };
    if (status) filter.status = status;
    let query = Task.find(filter).sort({ createdAt: -1 });
    if (q) {
      query = Task.find({ ...filter, $text: { $search: q } });
    }
    const pageNum = Number(page) || 1;
    const limitNum = Math.min(Number(limit) || 10, 100);
    const [items, total] = await Promise.all([
      query.skip((pageNum - 1) * limitNum).limit(limitNum),
      Task.countDocuments(filter)
    ]);
    res.json({ items, total, page: pageNum, limit: limitNum });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, description, status } = createSchema.parse(req.body);
    const task = await Task.create({ userId: req.userId, title, description, status });
    res.status(201).json({ task });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: err.issues });
    }
    next(err);
  }
});

const idSchema = z.object({ id: z.string().min(1) });
const updateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'done']).optional()
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = idSchema.parse(req.params);
    const update = updateSchema.parse(req.body);
    const task = await Task.findOneAndUpdate({ _id: id, userId: req.userId }, update, { new: true });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ task });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: err.issues });
    }
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = idSchema.parse(req.params);
    const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: err.issues });
    }
    next(err);
  }
});

export default router;


