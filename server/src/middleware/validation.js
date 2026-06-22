/**
 * Validation Middleware
 * Request validation using express-validator
 */
const { body, validationResult } = require('express-validator');

// Handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// Auth validations
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
  body('email').isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase, one lowercase, and one number'),
  validate,
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  validate,
];

// Resume validations
const resumeValidation = [
  body('title').trim().notEmpty().withMessage('Resume title is required'),
  body('personalInfo.fullName').trim().notEmpty().withMessage('Full name is required'),
  body('personalInfo.email').isEmail().withMessage('Valid email is required'),
  validate,
];

// ATS check validation
const atsCheckValidation = [
  body('resumeId').isMongoId().withMessage('Valid resume ID is required'),
  body('jobDescription').trim().notEmpty().withMessage('Job description is required')
    .isLength({ min: 50 }).withMessage('Job description must be at least 50 characters'),
  validate,
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  resumeValidation,
  atsCheckValidation,
};
