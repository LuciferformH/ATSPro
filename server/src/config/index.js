/**
 * Environment Configuration
 * Loads and validates all required environment variables
 */
const dotenv = require('dotenv');
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/atspro',
  jwtSecret: process.env.JWT_SECRET || 'atspro_default_secret_change_in_production',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  bcryptSaltRounds: 12,
  rateLimitWindowMs: 15 * 60 * 1000,
  rateLimitMaxRequests: 100,
};

module.exports = config;
