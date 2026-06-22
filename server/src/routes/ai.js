/**
 * AI Routes
 * AI-powered resume suggestions and generation
 */
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getSuggestions,
  generateSummary,
} = require('../controllers/aiController');

router.use(protect);

router.post('/suggestions', getSuggestions);
router.post('/generate-summary', generateSummary);

module.exports = router;
