import { body, check } from 'express-validator';

export const registerValidator = [
  check('firstName', 'First Name is required').isString(),
  check('lastName', 'Last Name is required').isString(),
  check('email', 'Valid Email is required').isEmail(),
  check('password', 'Password with 6 or more characters required').isLength({
    min: 6,
  }),
];

export const logInValidator = [
  check('email', 'Valid Email is required').isEmail(),
  check('password', 'Password with 6 or more characters required').isLength({
    min: 6,
  }),
];

export const hotelValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('country').notEmpty().withMessage('Country is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('type').notEmpty().withMessage('Hotel type is required'),
  body('pricePerNight')
    .notEmpty()
    .isNumeric()
    .withMessage('Price per night is required and must be a number'),
  body('facilities')
    .notEmpty()
    .isArray()
    .withMessage('Facilities are required'),
];
