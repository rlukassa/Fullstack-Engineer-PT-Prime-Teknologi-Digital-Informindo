import express from 'express';
const router = express.Router();
import { __login__, __register__, __logout__ } from '../controllers/authController';

router.post('/login', __login__);
router.post('/register', __register__);
router.post('/logout', __logout__);

export default router;