/**
 * Resume Controller
 * Handles CRUD operations for resumes
 */
const Resume = require('../models/Resume');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

/**
 * @desc    Get all resumes for user
 * @route   GET /api/resumes
 * @access  Private
 */
exports.getResumes = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;

    const total = await Resume.countDocuments({ user: req.user._id });
    const resumes = await Resume.find({ user: req.user._id })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    return ApiResponse.paginated(res, resumes, total, parseInt(page), parseInt(limit));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single resume
 * @route   GET /api/resumes/:id
 * @access  Private
 */
exports.getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      throw new ApiError(404, 'Resume not found');
    }

    return ApiResponse.success(res, resume);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new resume
 * @route   POST /api/resumes
 * @access  Private
 */
exports.createResume = async (req, res, next) => {
  try {
    const resumeData = {
      ...req.body,
      user: req.user._id,
    };

    const resume = await Resume.create(resumeData);

    // Increment user's resume count
    req.user.usageCount.resumesCreated += 1;
    await req.user.save({ validateBeforeSave: false });

    return ApiResponse.success(res, resume, 'Resume created successfully', 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update resume
 * @route   PUT /api/resumes/:id
 * @access  Private
 */
exports.updateResume = async (req, res, next) => {
  try {
    let resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      throw new ApiError(404, 'Resume not found');
    }

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    return ApiResponse.success(res, resume, 'Resume updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete resume
 * @route   DELETE /api/resumes/:id
 * @access  Private
 */
exports.deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      throw new ApiError(404, 'Resume not found');
    }

    return ApiResponse.success(res, null, 'Resume deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Duplicate resume
 * @route   POST /api/resumes/:id/duplicate
 * @access  Private
 */
exports.duplicateResume = async (req, res, next) => {
  try {
    const original = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!original) {
      throw new ApiError(404, 'Resume not found');
    }

    const resumeData = original.toObject();
    delete resumeData._id;
    delete resumeData.createdAt;
    delete resumeData.updatedAt;
    resumeData.title = `${original.title} (Copy)`;

    const newResume = await Resume.create({
      ...resumeData,
      user: req.user._id,
    });

    return ApiResponse.success(res, newResume, 'Resume duplicated successfully', 201);
  } catch (error) {
    next(error);
  }
};
