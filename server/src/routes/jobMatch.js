/**
 * Job Match Routes
 * Resume vs job description matching
 */
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  analyzeMatch,
  getMatchHistory,
  getMatch,
  deleteMatch,
} = require('../controllers/jobMatchController');

router.use(protect);

router.post('/analyze', analyzeMatch);
router.get('/history', getMatchHistory);
router.get('/:id', getMatch);
router.delete('/:id', deleteMatch);

module.exports = router;
