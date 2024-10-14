import express from 'express';
import {
  validateSuggestions,
  handleValidationErrors,
} from '../middleware/validation.js';
import { handleSuggestionRequest } from '../controllers/suggestions.js';

const router = express.Router();

router.post(
  '/suggestions',
  validateSuggestions,
  handleValidationErrors,
  handleSuggestionRequest
);

export default router;
