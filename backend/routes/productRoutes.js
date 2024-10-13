import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
  updateProductReview,
  deleteProductReview,
} from '../controllers/productControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createProductValidator,
  updateProductValidator,
  createProductReviewValidator,
  updateProductReviewValidator,
} from '../validators/productValidator.js'; // Adjust the path as needed
import { validate } from '../middleware/validateMiddleware.js'; // Middleware to check for validation errors

const router = express.Router();

// Limit review operations (e.g., 3 reviews per hour)
const reviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: 'Too many reviews, please try again later.',
});

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProductValidator, validate, createProduct); // Added validators

router.route('/:id/reviews')
  .post(protect, reviewLimiter, createProductReviewValidator, validate, createProductReview); // Added validators

router.route('/top').get(getTopProducts);

router.route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProductValidator, validate, updateProduct); // Added validators

router.route('/:id/reviews/:reviewId')
  .put(protect, reviewLimiter, updateProductReviewValidator, validate, updateProductReview) // Added validators
  .delete(protect, reviewLimiter, deleteProductReview); // No validation needed here since ID is in the URL

export default router;
