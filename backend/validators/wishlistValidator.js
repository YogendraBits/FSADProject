import { body, param } from 'express-validator';

export const addToWishlistValidator = [
  body('userId')
    .exists()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('User ID must be a valid MongoDB Object ID'),

  body('productId')
    .exists()
    .withMessage('Product ID is required')
    .isMongoId()
    .withMessage('Product ID must be a valid MongoDB Object ID'),

  body('name')
    .exists()
    .withMessage('Product name is required')
    .isString()
    .withMessage('Product name must be a string'),

  body('image')
    .exists()
    .withMessage('Product image is required')
    .isURL()
    .withMessage('Product image must be a valid URL'),

  body('price')
    .exists()
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('Product price must be a number'),

  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer'),
];

export const removeFromWishlistValidator = [
  param('id')
    .exists()
    .withMessage('Wishlist item ID is required')
    .isMongoId()
    .withMessage('Wishlist item ID must be a valid MongoDB Object ID'),
];
