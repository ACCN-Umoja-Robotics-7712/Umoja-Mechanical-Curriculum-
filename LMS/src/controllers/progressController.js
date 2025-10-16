const { validationResult } = require('express-validator');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

exports.enroll = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course || !course.published) {
      return res.status(404).json({ message: 'Course not available for enrollment' });
    }

    const enrollment = await Enrollment.findOneAndUpdate(
      { student: req.userId, course: courseId },
      { $setOnInsert: { progress: course.lessons.map((lesson) => ({ lessonId: lesson._id, completed: false })) } },
      { upsert: true, new: true }
    );

    return res.status(201).json({ enrollment });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Already enrolled' });
    }
    return next(error);
  }
};

exports.getMyEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ student: req.userId })
      .populate({ path: 'course', select: 'title description category difficulty thumbnailUrl' })
      .lean();

    return res.json({ enrollments });
  } catch (error) {
    return next(error);
  }
};

exports.getCourseProgress = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findOne({ student: req.userId, course: req.params.id })
      .populate({ path: 'course', select: 'title lessons' });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    return res.json({ enrollment });
  } catch (error) {
    return next(error);
  }
};

exports.updateLessonProgress = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { lessonId, completed, response } = req.body;
    const enrollment = await Enrollment.findOne({ student: req.userId, course: req.params.id });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    const lessonProgress = enrollment.progress.find((item) => String(item.lessonId) === lessonId);
    if (!lessonProgress) {
      return res.status(404).json({ message: 'Lesson not found in enrollment' });
    }

    if (typeof completed === 'boolean') {
      lessonProgress.completed = completed;
      if (completed) {
        lessonProgress.lastVisitedAt = new Date();
      }
    }

    if (response) {
      lessonProgress.responses.push({
        prompt: response.prompt,
        response: response.value,
      });
    }

    const allCompleted = enrollment.progress.every((item) => item.completed);
    if (allCompleted) {
      enrollment.status = 'completed';
      enrollment.completedAt = new Date();
    } else if (enrollment.status === 'completed') {
      enrollment.status = 'in-progress';
      enrollment.completedAt = undefined;
    }

    await enrollment.save();

    return res.json({ enrollment });
  } catch (error) {
    return next(error);
  }
};
