const express = require('express');
const { body } = require('express-validator');
const courseController = require('../controllers/courseController');
const auth = require('../middleware/authMiddleware');
const optionalAuth = require('../middleware/optionalAuth');

const router = express.Router();

router.get('/', optionalAuth, courseController.listCourses);
router.get('/:id', optionalAuth, courseController.getCourse);

router.post(
  '/',
  auth(['admin', 'instructor']),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid difficulty'),
  ],
  courseController.createCourse
);

router.patch('/:id', auth(['admin', 'instructor']), courseController.updateCourse);
router.delete('/:id', auth(['admin', 'instructor']), courseController.deleteCourse);

router.post(
  '/:id/lessons',
  auth(['admin', 'instructor']),
  [
    body('title').notEmpty().withMessage('Lesson title is required'),
    body('overview').notEmpty().withMessage('Lesson overview is required'),
  ],
  courseController.addLesson
);

router.patch(
  '/:id/lessons/:lessonId',
  auth(['admin', 'instructor']),
  courseController.updateLesson
);

router.post('/:id/reorder-lessons', auth(['admin', 'instructor']), courseController.reorderLessons);
router.post('/:id/toggle-publish', auth(['admin', 'instructor']), courseController.togglePublish);

module.exports = router;
