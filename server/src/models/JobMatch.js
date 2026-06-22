/**
 * Job Match Model Schema
 * Stores resume vs job description matching results
 */
const mongoose = require('mongoose');

const jobMatchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    default: '',
  },
  jobDescription: {
    type: String,
    required: true,
  },
  matchScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  skillMatch: {
    matched: [String],
    missing: [String],
    percentage: Number,
  },
  experienceMatch: {
    required: String,
    candidate: String,
    isMatch: Boolean,
  },
  educationMatch: {
    required: String,
    candidate: String,
    isMatch: Boolean,
  },
  recommendations: [String],
  status: {
    type: String,
    enum: ['pending', 'applied', 'interview', 'rejected', 'accepted'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

jobMatchSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('JobMatch', jobMatchSchema);
