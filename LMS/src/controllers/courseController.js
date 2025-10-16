const { validationResult } = require('express-validator');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

exports.listCourses = async (req, res, next) => {
  try {
    const { includeDrafts, category, difficulty, search } = req.query;
    const filters = {};

    if (!(includeDrafts === 'true' && ['admin', 'instructor'].includes(req.userRole))) {
      filters.published = true;
    }

    if (category) filters.category = category;
    if (difficulty) filters.difficulty = difficulty;
    if (search) filters.title = { $regex: search, $options: 'i' };

    const courses = await Course.find(filters)
      .populate('instructor', 'name email')
      .sort({ createdAt: -1 });

    return res.json({ courses });
  } catch (error) {
    return next(error);
  }
};

exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!course.published && !['admin', 'instructor'].includes(req.userRole)) {
      return res.status(403).json({ message: 'Course is not published yet' });
    }

    return res.json({ course });
  } catch (error) {
    return next(error);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const payload = {
      ...req.body,
      instructor: req.userId,
    };

    const course = await Course.create(payload);
    return res.status(201).json({ course });
  } catch (error) {
    return next(error);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (req.userRole === 'instructor' && course.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to modify this course' });
    }

    Object.assign(course, req.body);
    await course.save();
    return res.json({ course });
  } catch (error) {
    return next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (req.userRole === 'instructor' && course.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    await Enrollment.deleteMany({ course: course._id });
    await course.deleteOne();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

exports.addLesson = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (req.userRole === 'instructor' && course.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to modify this course' });
    }

    const lessonData = {
      ...req.body,
      order: course.lessons.length,
    };

    course.lessons.push(lessonData);
    await course.save();

    const newLesson = course.lessons[course.lessons.length - 1];
    await Enrollment.updateMany(
      { course: course._id, 'progress.lessonId': { $ne: newLesson._id } },
      { $push: { progress: { lessonId: newLesson._id, completed: false } } }
    );

    return res.status(201).json({ course });
  } catch (error) {
    return next(error);
  }
};

exports.updateLesson = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (req.userRole === 'instructor' && course.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to modify this course' });
    }

    const lesson = course.lessons.id(req.params.lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    Object.assign(lesson, req.body);
    await course.save();

    return res.json({ lesson });
  } catch (error) {
    return next(error);
  }
};

exports.reorderLessons = async (req, res, next) => {
  try {
    const { lessonOrder } = req.body; // array of lesson IDs in desired order
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (req.userRole === 'instructor' && course.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to modify this course' });
    }

    course.lessons.forEach((lesson) => {
      const newIndex = lessonOrder.indexOf(String(lesson._id));
      if (newIndex !== -1) {
        lesson.order = newIndex;
      }
    });

    course.lessons.sort((a, b) => a.order - b.order);
    await course.save();

    return res.json({ course });
  } catch (error) {
    return next(error);
  }
};

exports.togglePublish = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (req.userRole === 'instructor' && course.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to modify this course' });
    }

    course.published = !course.published;
    await course.save();

    return res.json({ course });
  } catch (error) {
    return next(error);
  }
};
