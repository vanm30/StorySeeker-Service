import { body, validationResult } from 'express-validator';

const validateSuggestions = [
  body('query')
    .isString()
    .withMessage('Query must be a string')
    .notEmpty()
    .withMessage('Query cannot be empty'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.array(),
    });
  }
  next();
};

export { validateSuggestions, handleValidationErrors };
