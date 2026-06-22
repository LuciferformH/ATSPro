/**
 * Authentication Routes
 * Handles user registration, login, logout, and profile
 */
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { registerValidation, loginValidation } = require('../middleware/validation');
const {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
} = require('../controllers/authController');

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, changePassword);

module.exports = router;
