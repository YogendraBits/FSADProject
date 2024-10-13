import { body, param } from 'express-validator';

export const addOrderItemsValidator = [
  body('user')
    .exists()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('User ID must be a valid MongoDB Object ID'),

  body('orderItems')
    .isArray()
    .withMessage('Order items must be an array')
    .custom((value) => {
      for (const item of value) {
        if (!item.name || !item.qty || !item.image || !item.price || !item.product) {
          throw new Error('Each order item must have name, qty, image, price, and product ID');
        }
      }
      return true;
    }),

  body('shippingAddress')
    .exists()
    .withMessage('Shipping address is required')
    .isObject()
    .withMessage('Shipping address must be an object')
    .custom((value) => {
      const { address, city, postalCode, country } = value;
      if (!address || !city || !postalCode || !country) {
        throw new Error('Shipping address must contain address, city, postalCode, and country');
      }
      return true;
    }),

  body('paymentMethod')
    .exists()
    .withMessage('Payment method is required')
    .isString()
    .withMessage('Payment method must be a string'),

  body('taxPrice')
    .exists()
    .withMessage('Tax price is required')
    .isNumeric()
    .withMessage('Tax price must be a number'),

  body('shippingPrice')
    .exists()
    .withMessage('Shipping price is required')
    .isNumeric()
    .withMessage('Shipping price must be a number'),

  body('totalPrice')
    .exists()
    .withMessage('Total price is required')
    .isNumeric()
    .withMessage('Total price must be a number'),
];

export const updateOrderToPaidValidator = [
  param('id')
    .exists()
    .withMessage('Order ID is required')
    .isMongoId()
    .withMessage('Order ID must be a valid MongoDB Object ID'),

  body('id')
    .exists()
    .withMessage('Payment ID is required')
    .isString()
    .withMessage('Payment ID must be a string'),

  body('status')
    .exists()
    .withMessage('Payment status is required')
    .isString()
    .withMessage('Payment status must be a string'),
];

export const updateOrderToDeliveredValidator = [
  param('id')
    .exists()
    .withMessage('Order ID is required')
    .isMongoId()
    .withMessage('Order ID must be a valid MongoDB Object ID'),
];
