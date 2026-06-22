/**
 * Resume Model Schema
 * Stores complete resume data with versioning
 */
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, 'Resume title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  template: {
    type: String,
    enum: ['modern', 'professional', 'minimal', 'creative', 'executive'],
    default: 'modern',
  },
  personalInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    location: String,
    linkedin: String,
    portfolio: String,
    github: String,
    summary: {
      type: String,
      maxlength: [1000, 'Summary cannot exceed 1000 characters'],
    },
  },
  experience: [{
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: Date,
    endDate: Date,
    isCurrent: { type: Boolean, default: false },
    description: String,
    achievements: [String],
  }],
  education: [{
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date,
    gpa: String,
    achievements: [String],
  }],
  skills: [{
    category: String,
    items: [String],
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    url: String,
  }],
  projects: [{
    name: String,
    description: String,
    url: String,
    technologies: [String],
    highlights: [String],
  }],
  languages: [{
    name: String,
    proficiency: {
      type: String,
      enum: ['native', 'fluent', 'advanced', 'intermediate', 'beginner'],
    },
  }],
  atsScore: {
    score: { type: Number, min: 0, max: 100, default: 0 },
    lastChecked: Date,
    suggestions: [String],
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  downloadCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

resumeSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Resume', resumeSchema);
