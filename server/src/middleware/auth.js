/**
 * Authentication Middleware
 * Verifies JWT tokens and attaches user to request
 */
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');

const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check for token in cookies
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(new ApiError(401, 'Not authorized - No token provided'));
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Attach user to request
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      return next(new ApiError(401, 'Not authorized - User not found or deactivated'));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new ApiError(401, 'Not authorized - Invalid token'));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Not authorized - Token expired'));
    }
    next(new ApiError(401, 'Not authorized'));
  }
};

// Role-based authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.plan)) {
      return next(new ApiError(403, 'You do not have permission for this action'));
    }
    next();
  };
};

module.exports = { protect, authorize };
