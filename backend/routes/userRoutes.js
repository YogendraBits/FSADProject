import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  authUsers,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUser,
  deleteUser,
  getUserById,
  updateUser,
  deleteOwnAccount,
} from '../controllers/userControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  registerUserValidator,
  updateUserProfileValidator,
  userIdValidator,
} from '../validators/userValidator.js'; // Adjust the path as needed
import { validate } from '../middleware/validateMiddleware.js'; // Middleware to check for validation errors

const router = express.Router();

// Limit login attempts (e.g., 5 attempts per 10 minutes)
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: 'Too many login attempts, please try again later.',
});

router.post('/login', loginLimiter, authUsers);

router.route('/')
  .post(registerUserValidator, validate, registerUser) // Added validators
  .get(protect, admin, getUser);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfileValidator, validate, updateUserProfile) // Added validators
  .delete(protect, deleteOwnAccount);

router.route('/:id')
  .delete(protect, admin, userIdValidator, validate, deleteUser) // Added validators
  .get(protect, admin, userIdValidator, validate, getUserById) // Added validators
  .put(protect, admin, userIdValidator, validate, updateUser); // Added validators

export default router;
