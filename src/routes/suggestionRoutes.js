import express from 'express';
import {
  validateSuggestions,
  handleValidationErrors,
} from '../middleware/validation.js';
import { handleSuggestionRequest } from '../controllers/suggestions.js';

const router = express.Router();

router.post(
  '/suggestions',
  (req, res, next) => {
    console.log('Received a POST request for suggestions...');
    next();
  },
  validateSuggestions,
  handleValidationErrors,
  handleSuggestionRequest
);

export default router;
