import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/OrderControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  addOrderItemsValidator,
  updateOrderToPaidValidator,
  updateOrderToDeliveredValidator
} from '../validators/orderValidator.js'; // Adjust the path as needed
import { validate } from '../middleware/validateMiddleware.js'; // This middleware checks for validation errors

const router = express.Router();

// Limit order operations (e.g., 30 requests per hour)
const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30,
  message: 'Too many order requests, please try again later.',
});

router.route('/')
  .post(protect, orderLimiter, addOrderItemsValidator, validate, addOrderItems) // Added validators
  .get(protect, admin, orderLimiter, getOrders);

router.route('/myorders').get(protect, orderLimiter, getMyOrders);

router.route('/:id')
  .get(protect, orderLimiter, getOrderById);

router.route('/:id/pay')
  .put(protect, orderLimiter, updateOrderToPaidValidator, validate, updateOrderToPaid); // Added validators

router.route('/:id/deliver')
  .put(protect, admin, orderLimiter, updateOrderToDeliveredValidator, validate, updateOrderToDelivered); // Added validators

export default router;
