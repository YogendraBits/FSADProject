import express from 'express';
import rateLimit from 'express-rate-limit';
import { protect } from '../middleware/authMiddleware.js';
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from '../controllers/addressController.js';
import { createAddressValidator, updateAddressValidator } from '../validators/addressValidator.js'; // Adjust the path as needed
import { validate } from '../middleware/validateMiddleware.js'; // This middleware checks for validation errors

const router = express.Router();

// Limit address operations (e.g., 20 requests per hour)
const addressLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit each IP to 20 requests per hour
  message: 'Too many address operations, please try again later.',
});

router.route('/')
  .get(protect, addressLimiter, getAddresses)
  .post(protect, addressLimiter, createAddressValidator, validate, createAddress); // Added validators

router.route('/:id')
  .put(protect, addressLimiter, updateAddressValidator, validate, updateAddress) // Added validators
  .delete(protect, addressLimiter, deleteAddress);

export default router;
