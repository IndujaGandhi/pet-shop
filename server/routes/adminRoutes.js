import express from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
} from '../controllers/adminController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Protect all admin routes
router.use(verifyToken, isAdmin);

// ============== PRODUCT ROUTES ==============
router.post('/products', upload.single('image'), createProduct);
router.put('/products/:id', upload.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);

// ============== CATEGORY ROUTES ==============
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// ============== ORDER ROUTES ==============
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

// ============== DASHBOARD ==============
router.get('/dashboard/stats', getDashboardStats);

export default router;
