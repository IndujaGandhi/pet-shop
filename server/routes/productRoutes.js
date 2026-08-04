import express from 'express';
import {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getRelatedProducts,
  addReview,
} from '../controllers/productController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);
router.get('/:id/related', getRelatedProducts);

// Protected routes
router.post('/:id/reviews', verifyToken, addReview);

export default router;
