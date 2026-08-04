import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
} from '../controllers/orderController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// All order routes are protected
router.use(verifyToken);

router.post('/', createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderById);
router.put('/:id/cancel', cancelOrder);

export default router;
