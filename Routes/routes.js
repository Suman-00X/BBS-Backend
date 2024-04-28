import express from 'express';

import { userSignup, userLogin, getUserProfile } from '../Controllers/userControllers';
import { addProduct, updateProduct, deleteProduct } from '../Controllers/productController.js';
import { getAllHoodies, getOneHoodie, orderHoodie } from './userController.js';

import isAdmin from '../Middlewares/adminMiddleware.js';
import { authenticateToken } from '../Middlewares/jwtMiddleware.js';

const router = express.Router();

//user routes (login, signup)
router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/profile', authenticateToken, getUserProfile);


// Admin routes for product(add, modify and delete)
router.post('/add', authenticateToken, isAdmin, addProduct);
router.put('/update/:id', authenticateToken, isAdmin, updateProduct);
router.delete('/delete/:id', authenticateToken, isAdmin, deleteProduct);


// User routes (browse and order)
router.get('/products', getAllHoodies);
router.get('/products/:id', getOneHoodie);
router.post('/order', authenticateToken, orderHoodie);


export default router;