import { body, param } from 'express-validator';

export const createAddressValidator = [
  body('user')
    .exists()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('User ID must be a valid MongoDB Object ID'),
  
  body('address')
    .exists()
    .withMessage('Address is required')
    .isString()
    .withMessage('Address must be a string'),
  
  body('city')
    .exists()
    .withMessage('City is required')
    .isString()
    .withMessage('City must be a string'),
  
  body('postalCode')
    .exists()
    .withMessage('Postal code is required')
    .isString()
    .withMessage('Postal code must be a string'),
  
  body('country')
    .exists()
    .withMessage('Country is required')
    .isString()
    .withMessage('Country must be a string'),
];

export const updateAddressValidator = [
  param('id')
    .exists()
    .withMessage('Address ID is required')
    .isMongoId()
    .withMessage('Address ID must be a valid MongoDB Object ID'),

  body('address')
    .optional()
    .isString()
    .withMessage('Address must be a string'),

  body('city')
    .optional()
    .isString()
    .withMessage('City must be a string'),

  body('postalCode')
    .optional()
    .isString()
    .withMessage('Postal code must be a string'),

  body('country')
    .optional()
    .isString()
    .withMessage('Country must be a string'),
];
