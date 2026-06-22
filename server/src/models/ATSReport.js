/**
 * ATS Report Model Schema
 * Stores ATS analysis reports and scoring results
 */
const mongoose = require('mongoose');

const atsReportSchema = new mongoose.Schema({
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
  jobDescription: {
    type: String,
    required: [true, 'Job description is required'],
  },
  jobTitle: {
    type: String,
    default: '',
  },
  company: {
    type: String,
    default: '',
  },
  overallScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  categoryScores: {
    keywords: { type: Number, min: 0, max: 100, default: 0 },
    formatting: { type: Number, min: 0, max: 100, default: 0 },
    experience: { type: Number, min: 0, max: 100, default: 0 },
    education: { type: Number, min: 0, max: 100, default: 0 },
    skills: { type: Number, min: 0, max: 100, default: 0 },
    contact: { type: Number, min: 0, max: 100, default: 0 },
  },
  matchedKeywords: [String],
  missingKeywords: [String],
  suggestions: [{
    category: String,
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
    },
    message: String,
  }],
  aiAnalysis: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

atsReportSchema.index({ user: 1, createdAt: -1 });
atsReportSchema.index({ resume: 1 });

module.exports = mongoose.model('ATSReport', atsReportSchema);
