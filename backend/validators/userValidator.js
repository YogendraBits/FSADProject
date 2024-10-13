import { body, param } from 'express-validator';

export const registerUserValidator = [
  body('name')
    .exists()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),

  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email address'),

  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const updateUserProfileValidator = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Email must be a valid email address'),

  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const userIdValidator = [
  param('id')
    .exists()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('User ID must be a valid MongoDB Object ID'),
];
