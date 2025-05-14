import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateAuth } from '../middleware/validation.js';

const router = express.Router();

// POST /api/auth/register — регистрация
router.post('/register', validateAuth, register);

// POST /api/auth/login — вход
router.post('/login', validateAuth, login);


export default router;