/**
 * Dashboard Controller
 * Provides analytics and statistics for the dashboard
 */
const User = require('../models/User');
const Resume = require('../models/Resume');
const ATSReport = require('../models/ATSReport');
const JobMatch = require('../models/JobMatch');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/dashboard/stats
 * @access  Private
 */
exports.getStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [resumeCount, atsReportCount, jobMatchCount, recentResumes, recentReports] = await Promise.all([
      Resume.countDocuments({ user: userId }),
      ATSReport.countDocuments({ user: userId }),
      JobMatch.countDocuments({ user: userId }),
      Resume.find({ user: userId })
        .sort('-createdAt')
        .limit(5)
        .select('title template atsScore createdAt'),
      ATSReport.find({ user: userId })
        .sort('-createdAt')
        .limit(5)
        .select('overallScore jobTitle company createdAt'),
    ]);

    // Calculate average ATS score
    const avgScoreResult = await ATSReport.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, avgScore: { $avg: '$overallScore' } } },
    ]);
    const averageATSScore = avgScoreResult.length > 0
      ? Math.round(avgScoreResult[0].avgScore)
      : 0;

    // Calculate average match score
    const avgMatchResult = await JobMatch.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, avgScore: { $avg: '$matchScore' } } },
    ]);
    const averageMatchScore = avgMatchResult.length > 0
      ? Math.round(avgMatchResult[0].avgScore)
      : 0;

    return ApiResponse.success(res, {
      overview: {
        totalResumes: resumeCount,
        totalATSReports: atsReportCount,
        totalJobMatches: jobMatchCount,
        averageATSScore,
        averageMatchScore,
      },
      usage: req.user.usageCount,
      recentResumes,
      recentReports,
      plan: req.user.plan,
    });
  } catch (error) {
    next(error);
  }
};
