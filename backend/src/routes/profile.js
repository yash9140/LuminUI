import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth.js';
import User from '../models/User.js';

const router = Router();

router.use(requireAuth);

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('email name createdAt updatedAt');
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

const updateSchema = z.object({ name: z.string().min(1).max(100) });

router.put('/', async (req, res, next) => {
  try {
    const { name } = updateSchema.parse(req.body);
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name },
      { new: true, select: 'email name createdAt updatedAt' }
    );
    res.json({ user });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: err.issues });
    }
    next(err);
  }
});

export default router;


