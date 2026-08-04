import express from 'express';
import {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
} from '../controllers/categoryController.js';

const router = express.Router();

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.get('/slug/:slug', getCategoryBySlug);

export default router;
