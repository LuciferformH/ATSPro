/**
 * AI Controller
 * Handles AI-powered resume suggestions and improvements
 */
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Resume = require('../models/Resume');
const config = require('../config');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

/**
 * @desc    Get AI suggestions for resume improvement
 * @route   POST /api/ai/suggestions
 * @access  Private
 */
exports.getSuggestions = async (req, res, next) => {
  try {
    const { resumeId, section } = req.body;

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user._id,
    });

    if (!resume) {
      throw new ApiError(404, 'Resume not found');
    }

    let prompt;
    switch (section) {
      case 'summary':
        prompt = `Improve this resume summary to be more impactful and ATS-friendly. Current summary: "${resume.personalInfo?.summary || 'Not provided'}". Provide a polished 2-3 sentence professional summary.`;
        break;
      case 'experience':
        prompt = `Review and improve these work experience descriptions using action verbs and quantifiable achievements: ${JSON.stringify(resume.experience)}. Provide improved bullet points for each position.`;
        break;
      case 'skills':
        prompt = `Suggest how to better organize and present these skills for ATS optimization: ${JSON.stringify(resume.skills)}. Recommend skill categories and additional relevant skills.`;
        break;
      default:
        prompt = `Analyze this resume and provide 5 specific improvements for ATS compatibility and impact: ${JSON.stringify(resume).substring(0, 3000)}. Focus on formatting, keywords, and content quality.`;
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      const suggestions = result.response.text();

      // Increment user's AI suggestion count
      req.user.usageCount.aiSuggestions += 1;
      await req.user.save({ validateBeforeSave: false });

      return ApiResponse.success(res, {
        section: section || 'general',
        suggestions,
        resumeId,
      }, 'AI suggestions generated successfully');
    } catch (aiError) {
      logger.error('Gemini AI error:', aiError.message);
      throw new ApiError(500, 'AI service temporarily unavailable. Please try again later.');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Generate resume summary using AI
 * @route   POST /api/ai/generate-summary
 * @access  Private
 */
exports.generateSummary = async (req, res, next) => {
  try {
    const { resumeId } = req.body;

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user._id,
    });

    if (!resume) {
      throw new ApiError(404, 'Resume not found');
    }

    const experienceText = (resume.experience || [])
      .map(e => `${e.position} at ${e.company}: ${e.description || ''}`)
      .join('\n');

    const skillsText = (resume.skills || [])
      .flatMap(s => s.items || [])
      .join(', ');

    const prompt = `Generate a professional resume summary (2-3 sentences) based on:
Experience: ${experienceText || 'Entry level'}
Skills: ${skillsText || 'Not specified'}
Target: ${resume.personalInfo?.fullName || 'Professional'}

Make it impactful, ATS-friendly, and highlight key strengths.`;

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      const summary = result.response.text().trim();

      return ApiResponse.success(res, { summary, resumeId }, 'Summary generated successfully');
    } catch (aiError) {
      logger.error('Gemini AI summary generation failed:', aiError.message);
      throw new ApiError(500, 'AI service temporarily unavailable');
    }
  } catch (error) {
    next(error);
  }
};
