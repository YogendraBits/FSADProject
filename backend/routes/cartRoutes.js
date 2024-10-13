import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  addCartItems,
  getCartById,
  updateCartItem,
  deleteCartItem,
  getMyCart,
  getCarts,
} from '../controllers/cartControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { addCartItemsValidator, updateCartItemValidator, deleteCartItemValidator } from '../validators/cartValidator.js'; // Adjust the path as needed
import { validate } from '../middleware/validateMiddleware.js'; // This middleware checks for validation errors

const router = express.Router();

// Limit cart operations (e.g., 50 requests per hour)
const cartLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50,
  message: 'Too many cart requests, please try again later.',
});

router.route('/')
  .post(protect, cartLimiter, addCartItemsValidator, validate, addCartItems) // Added validators
  .get(protect, admin, cartLimiter, getCarts);

router.route('/mycart').get(protect, cartLimiter, getMyCart);

router.route('/:id')
  .get(protect, cartLimiter, getCartById)
  .put(protect, cartLimiter, updateCartItemValidator, validate, updateCartItem); // Added validators

router.route('/:cartId/item/:itemId')
  .put(protect, cartLimiter, updateCartItemValidator, validate, updateCartItem) // Added validators
  .delete(protect, cartLimiter, deleteCartItemValidator, validate, deleteCartItem); // Added validators

export default router;
