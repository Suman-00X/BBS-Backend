import express from 'express';

import { signup, login, getUserProfile, updateProfile } from '../Controllers/userController.js';
import { authenticateToken } from '../Middlewares/jwtMiddleware.js';

const router = express.Router();

//user routes (login, signup)
router.post('/signup', signup);
router.post('/login', login);
router.get('/update', authenticateToken, updateProfile);
router.get('/profile', authenticateToken, getUserProfile);

export default router;