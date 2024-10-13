import { body, param } from 'express-validator';

export const createProductValidator = [
  body('name')
    .exists()
    .withMessage('Product name is required')
    .isString()
    .withMessage('Product name must be a string'),

  body('image')
    .exists()
    .withMessage('Product image is required')
    .isString()
    .withMessage('Product image must be a string'),

  body('brand')
    .exists()
    .withMessage('Product brand is required')
    .isString()
    .withMessage('Product brand must be a string'),

  body('category')
    .exists()
    .withMessage('Product category is required')
    .isString()
    .withMessage('Product category must be a string'),

  body('description')
    .exists()
    .withMessage('Product description is required')
    .isString()
    .withMessage('Product description must be a string'),

  body('price')
    .exists()
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('Product price must be a number'),

  body('countInStock')
    .exists()
    .withMessage('Product count in stock is required')
    .isNumeric()
    .withMessage('Product count in stock must be a number'),
];

export const updateProductValidator = [
  param('id')
    .exists()
    .withMessage('Product ID is required')
    .isMongoId()
    .withMessage('Product ID must be a valid MongoDB Object ID'),

  body('name')
    .optional()
    .isString()
    .withMessage('Product name must be a string'),

  body('image')
    .optional()
    .isString()
    .withMessage('Product image must be a string'),

  body('brand')
    .optional()
    .isString()
    .withMessage('Product brand must be a string'),

  body('category')
    .optional()
    .isString()
    .withMessage('Product category must be a string'),

  body('description')
    .optional()
    .isString()
    .withMessage('Product description must be a string'),

  body('price')
    .optional()
    .isNumeric()
    .withMessage('Product price must be a number'),

  body('countInStock')
    .optional()
    .isNumeric()
    .withMessage('Product count in stock must be a number'),
];

export const createProductReviewValidator = [
  param('id')
    .exists()
    .withMessage('Product ID is required')
    .isMongoId()
    .withMessage('Product ID must be a valid MongoDB Object ID'),

  body('rating')
    .exists()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),

  body('comment')
    .exists()
    .withMessage('Comment is required')
    .isString()
    .withMessage('Comment must be a string'),
];

export const updateProductReviewValidator = [
  param('id')
    .exists()
    .withMessage('Product ID is required')
    .isMongoId()
    .withMessage('Product ID must be a valid MongoDB Object ID'),

  param('reviewId')
    .exists()
    .withMessage('Review ID is required')
    .isMongoId()
    .withMessage('Review ID must be a valid MongoDB Object ID'),

  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),

  body('comment')
    .optional()
    .isString()
    .withMessage('Comment must be a string'),
];
