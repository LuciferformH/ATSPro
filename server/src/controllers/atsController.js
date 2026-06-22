/**
 * ATS Controller
 * Handles ATS score checking and AI-powered resume analysis
 */
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Resume = require('../models/Resume');
const ATSReport = require('../models/ATSReport');
const config = require('../config');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(config.geminiApiKey);

/**
 * Extract keywords from job description
 */
const extractKeywords = (jobDescription) => {
  // Common stop words to exclude
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'shall', 'can', 'this', 'that',
    'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
    'what', 'which', 'who', 'whom', 'when', 'where', 'why', 'how',
    'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other',
    'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
    'than', 'too', 'very', 'just', 'because', 'as', 'until', 'while',
  ]);

  const words = jobDescription
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s+#]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));

  return [...new Set(words)];
};

/**
 * Calculate ATS score
 */
const calculateATSScore = (resume, keywords) => {
  const resumeText = JSON.stringify(resume).toLowerCase();
  const matched = keywords.filter(kw => resumeText.includes(kw.toLowerCase()));
  const missing = keywords.filter(kw => !resumeText.includes(kw.toLowerCase()));

  const keywordScore = Math.round((matched.length / keywords.length) * 100);
  const formatScore = resume.personalInfo ? 90 : 50;
  const experienceScore = (resume.experience && resume.experience.length > 0) ? 85 : 30;
  const educationScore = (resume.education && resume.education.length > 0) ? 80 : 30;
  const skillsScore = (resume.skills && resume.skills.length > 0) ? 75 : 20;
  const contactScore = (resume.personalInfo?.email && resume.personalInfo?.phone) ? 95 : 60;

  const overallScore = Math.round(
    (keywordScore * 0.35) +
    (formatScore * 0.1) +
    (experienceScore * 0.2) +
    (educationScore * 0.1) +
    (skillsScore * 0.15) +
    (contactScore * 0.1)
  );

  return {
    overallScore: Math.min(overallScore, 100),
    categoryScores: {
      keywords: keywordScore,
      formatting: formatScore,
      experience: experienceScore,
      education: educationScore,
      skills: skillsScore,
      contact: contactScore,
    },
    matchedKeywords: matched,
    missingKeywords: missing,
  };
};

/**
 * @desc    Check ATS score for a resume
 * @route   POST /api/ats/check
 * @access  Private
 */
exports.checkATSScore = async (req, res, next) => {
  try {
    const { resumeId, jobDescription, jobTitle, company } = req.body;

    // Fetch resume
    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user._id,
    });

    if (!resume) {
      throw new ApiError(404, 'Resume not found');
    }

    // Extract keywords from job description
    const keywords = extractKeywords(jobDescription);

    if (keywords.length === 0) {
      throw new ApiError(400, 'Could not extract meaningful keywords from job description');
    }

    // Calculate ATS score
    const scores = calculateATSScore(resume, keywords);

    // Get AI suggestions using Gemini
    let aiAnalysis = '';
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `Analyze this resume against the job description and provide 3-5 specific improvement suggestions:
      
Resume Content: ${JSON.stringify(resume).substring(0, 3000)}
Job Description: ${jobDescription.substring(0, 2000)}
ATS Score: ${scores.overallScore}/100
Missing Keywords: ${scores.missingKeywords.join(', ')}

Provide concise, actionable suggestions to improve the ATS score.`;

      const result = await model.generateContent(prompt);
      aiAnalysis = result.response.text();
    } catch (aiError) {
      logger.warn('Gemini AI analysis failed, continuing without AI suggestions:', aiError.message);
      aiAnalysis = 'AI analysis temporarily unavailable. Please try again later.';
    }

    // Generate suggestions
    const suggestions = [];
    if (scores.missingKeywords.length > 0) {
      suggestions.push({
        category: 'Keywords',
        priority: 'high',
        message: `Add these missing keywords: ${scores.missingKeywords.slice(0, 5).join(', ')}`,
      });
    }
    if (!resume.personalInfo?.phone) {
      suggestions.push({
        category: 'Contact',
        priority: 'medium',
        message: 'Add a phone number to improve contact score',
      });
    }
    if (!resume.experience || resume.experience.length === 0) {
      suggestions.push({
        category: 'Experience',
        priority: 'high',
        message: 'Add work experience to significantly improve your score',
      });
    }

    // Save report
    const report = await ATSReport.create({
      user: req.user._id,
      resume: resumeId,
      jobDescription,
      jobTitle: jobTitle || '',
      company: company || '',
      overallScore: scores.overallScore,
      categoryScores: scores.categoryScores,
      matchedKeywords: scores.matchedKeywords,
      missingKeywords: scores.missingKeywords,
      suggestions,
      aiAnalysis,
    });

    // Update resume ATS score
    resume.atsScore = {
      score: scores.overallScore,
      lastChecked: new Date(),
      suggestions: suggestions.map(s => s.message),
    };
    await resume.save({ validateBeforeSave: false });

    // Increment user's ATS check count
    req.user.usageCount.atsChecks += 1;
    await req.user.save({ validateBeforeSave: false });

    return ApiResponse.success(res, report, 'ATS analysis completed');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get ATS report history
 * @route   GET /api/ats/reports
 * @access  Private
 */
exports.getATSReports = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const total = await ATSReport.countDocuments({ user: req.user._id });
    const reports = await ATSReport.find({ user: req.user._id })
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('resume', 'title template');

    return ApiResponse.paginated(res, reports, total, parseInt(page), parseInt(limit));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single ATS report
 * @route   GET /api/ats/reports/:id
 * @access  Private
 */
exports.getATSReport = async (req, res, next) => {
  try {
    const report = await ATSReport.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('resume', 'title template personalInfo');

    if (!report) {
      throw new ApiError(404, 'Report not found');
    }

    return ApiResponse.success(res, report);
  } catch (error) {
    next(error);
  }
};
