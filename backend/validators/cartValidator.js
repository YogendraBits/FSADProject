import { body, param } from 'express-validator';

export const addCartItemsValidator = [
  body('user')
    .exists()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('User ID must be a valid MongoDB Object ID'),
  
  body('cartItems')
    .isArray()
    .withMessage('Cart items must be an array')
    .custom((value) => {
      for (const item of value) {
        if (!item.product || !item.name || !item.qty || !item.price || !item.image) {
          throw new Error('Each cart item must have product, name, qty, price, and image');
        }
      }
      return true;
    }),
];

export const updateCartItemValidator = [
  param('cartId')
    .exists()
    .withMessage('Cart ID is required')
    .isMongoId()
    .withMessage('Cart ID must be a valid MongoDB Object ID'),
  
  param('itemId')
    .exists()
    .withMessage('Item ID is required')
    .isMongoId()
    .withMessage('Item ID must be a valid MongoDB Object ID'),

  body('qty')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('Quantity must be a positive integer'),

  body('price')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),
];

export const deleteCartItemValidator = [
  param('cartId')
    .exists()
    .withMessage('Cart ID is required')
    .isMongoId()
    .withMessage('Cart ID must be a valid MongoDB Object ID'),

  param('itemId')
    .exists()
    .withMessage('Item ID is required')
    .isMongoId()
    .withMessage('Item ID must be a valid MongoDB Object ID'),
];
