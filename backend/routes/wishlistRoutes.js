import express from 'express';
import rateLimit from 'express-rate-limit';
import { protect } from '../middleware/authMiddleware.js';
import {
  addTowishlist,
  getWishlist,
  removeFromWishlist,
} from '../controllers/wishlistControllers.js';
import {
  addToWishlistValidator,
  removeFromWishlistValidator,
} from '../validators/wishlistValidator.js'; // Adjust the path as necessary
import { validate } from '../middleware/validateMiddleware.js'; // Import the validate middleware

const router = express.Router();

// Limit wishlist operations (e.g., 20 requests per hour)
const wishlistLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Adjusted to a reasonable limit for wishlist requests
  message: 'Too many wishlist requests, please try again later.',
});

router.post('/', protect, wishlistLimiter, addToWishlistValidator, validate, addTowishlist);
router.get('/', protect, wishlistLimiter, getWishlist);
router.delete('/:id', protect, wishlistLimiter, removeFromWishlistValidator, validate, removeFromWishlist);

export default router;
