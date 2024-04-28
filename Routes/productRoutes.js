import express from 'express';

import { addHoodie, updateHoodie, deleteHoodie } from '../Controllers/productController.js';
import { authenticateToken } from '../Middlewares/jwtMiddleware.js';
import isAdmin from '../Middlewares/adminMiddleware.js';

const router = express.Router();

// Admin routes for product(add, modify and delete)
router.post('/add', authenticateToken, isAdmin, addHoodie);
router.put('/update/:id', authenticateToken, isAdmin, updateHoodie);
router.delete('/delete/:id', authenticateToken, isAdmin, deleteHoodie);

export default router;