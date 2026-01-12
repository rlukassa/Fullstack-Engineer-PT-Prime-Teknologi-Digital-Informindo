import express from 'express';
const router = express.Router();
import { __login__, __register__ } from '../controllers/authController';

router.post('/login', __login__);
router.post('/register', __register__);

export default router;