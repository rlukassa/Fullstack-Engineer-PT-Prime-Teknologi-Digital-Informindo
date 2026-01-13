import { Router } from 'express';
import { getUserById, getUserByUsername } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/:id', authenticateToken, getUserById);
router.get('/username/:username', authenticateToken, getUserByUsername);

export default router;
