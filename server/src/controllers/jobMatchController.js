/**
 * Job Match Controller
 * Handles resume vs job description matching analysis
 */
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Resume = require('../models/Resume');
const JobMatch = require('../models/JobMatch');
const config = require('../config');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

/**
 * @desc    Analyze resume vs job match
 * @route   POST /api/job-match/analyze
 * @access  Private
 */
exports.analyzeMatch = async (req, res, next) => {
  try {
    const { resumeId, jobTitle, company, jobDescription } = req.body;

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user._id,
    });

    if (!resume) {
      throw new ApiError(404, 'Resume not found');
    }

    // Extract skills from resume
    const resumeSkills = (resume.skills || []).flatMap(s => s.items || []);

    // Extract skills from job description (simple keyword extraction)
    const techKeywords = [
      'javascript', 'python', 'java', 'react', 'node.js', 'angular', 'vue',
      'typescript', 'sql', 'mongodb', 'postgresql', 'aws', 'azure', 'docker',
      'kubernetes', 'git', 'ci/cd', 'agile', 'scrum', 'machine learning',
      'ai', 'data analysis', 'sql', 'html', 'css', 'rest api', 'graphql',
      'linux', 'bash', 'redis', 'kafka', 'microservices', 'serverless',
    ];

    const jobSkills = techKeywords.filter(kw =>
      jobDescription.toLowerCase().includes(kw.toLowerCase())
    );

    const matchedSkills = resumeSkills.filter(s =>
      jobSkills.some(jk => s.toLowerCase().includes(jk.toLowerCase()) || jk.includes(s.toLowerCase()))
    );

    const missingSkills = jobSkills.filter(js =>
      !resumeSkills.some(s => s.toLowerCase().includes(js.toLowerCase()) || js.includes(s.toLowerCase()))
    );

    const skillMatchPercentage = jobSkills.length > 0
      ? Math.round((matchedSkills.length / jobSkills.length) * 100)
      : 50;

    // Calculate overall match score
    const experienceMatch = resume.experience && resume.experience.length > 0;
    const educationMatch = resume.education && resume.education.length > 0;

    const matchScore = Math.round(
      (skillMatchPercentage * 0.5) +
      (experienceMatch ? 25 : 10) +
      (educationMatch ? 25 : 10)
    );

    // Get AI recommendations
    let recommendations = [];
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `Given a resume with skills [${resumeSkills.join(', ')}] and a job posting for ${jobTitle} at ${company} requiring skills [${jobSkills.join(', ')}], provide 3-5 brief actionable recommendations to improve the match. Missing skills: [${missingSkills.join(', ')}]`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      recommendations = text.split('\n').filter(line => line.trim().length > 0).slice(0, 5);
    } catch (aiError) {
      logger.warn('Gemini AI recommendation failed:', aiError.message);
      recommendations = [
        `Focus on gaining experience with: ${missingSkills.slice(0, 3).join(', ')}`,
        'Tailor your resume summary to match the job description',
        'Highlight relevant projects that demonstrate required skills',
      ];
    }

    const match = await JobMatch.create({
      user: req.user._id,
      resume: resumeId,
      jobTitle,
      company: company || '',
      jobDescription,
      matchScore,
      skillMatch: {
        matched: matchedSkills,
        missing: missingSkills,
        percentage: skillMatchPercentage,
      },
      experienceMatch: {
        required: 'Professional experience',
        candidate: experienceMatch ? `${resume.experience.length} positions` : 'No experience listed',
        isMatch: experienceMatch,
      },
      educationMatch: {
        required: 'Educational background',
        candidate: educationMatch ? `${resume.education.length} entries` : 'No education listed',
        isMatch: educationMatch,
      },
      recommendations,
    });

    // Increment user's AI suggestion count
    req.user.usageCount.aiSuggestions += 1;
    await req.user.save({ validateBeforeSave: false });

    return ApiResponse.success(res, match, 'Job match analysis completed');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get job match history
 * @route   GET /api/job-match/history
 * @access  Private
 */
exports.getMatchHistory = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const total = await JobMatch.countDocuments({ user: req.user._id });
    const matches = await JobMatch.find({ user: req.user._id })
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('resume', 'title template');

    return ApiResponse.paginated(res, matches, total, parseInt(page), parseInt(limit));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single job match
 * @route   GET /api/job-match/:id
 * @access  Private
 */
exports.getMatch = async (req, res, next) => {
  try {
    const match = await JobMatch.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('resume', 'title template personalInfo skills');

    if (!match) {
      throw new ApiError(404, 'Job match not found');
    }

    return ApiResponse.success(res, match);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete job match
 * @route   DELETE /api/job-match/:id
 * @access  Private
 */
exports.deleteMatch = async (req, res, next) => {
  try {
    const match = await JobMatch.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!match) {
      throw new ApiError(404, 'Job match not found');
    }

    return ApiResponse.success(res, null, 'Job match deleted successfully');
  } catch (error) {
    next(error);
  }
};
