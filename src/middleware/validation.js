import { body, validationResult } from 'express-validator';

const validateSuggestions = [
  body('query')
    .isString()
    .withMessage('Query must be a string')
    .notEmpty()
    .withMessage('Query cannot be empty'),
];

const handleValidationErrors = (res, req, next) => {
  console.log('Validating request...');

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation failed:', errors.array());
    return res.status(400).json({
      status: 'error',
      errors: errors.array(),
    });
  }
  console.log('Validation OK');
  next();
};

export { validateSuggestions, handleValidationErrors };
