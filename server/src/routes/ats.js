/**
 * ATS Routes
 * ATS score checking and report management
 */
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { atsCheckValidation } = require('../middleware/validation');
const {
  checkATSScore,
  getATSReports,
  getATSReport,
} = require('../controllers/atsController');

router.use(protect);

router.post('/check', atsCheckValidation, checkATSScore);
router.get('/reports', getATSReports);
router.get('/reports/:id', getATSReport);

module.exports = router;
