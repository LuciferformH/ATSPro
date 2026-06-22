/**
 * Resume Routes
 * CRUD operations for resume management
 */
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { resumeValidation } = require('../middleware/validation');
const {
  getResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  duplicateResume,
} = require('../controllers/resumeController');

router.use(protect); // All routes require authentication

router.get('/', getResumes);
router.get('/:id', getResume);
router.post('/', resumeValidation, createResume);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);
router.post('/:id/duplicate', duplicateResume);

module.exports = router;
