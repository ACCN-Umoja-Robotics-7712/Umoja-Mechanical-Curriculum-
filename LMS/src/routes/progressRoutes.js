const express = require('express');
const { body } = require('express-validator');
const progressController = require('../controllers/progressController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/enroll',
  auth(['student', 'instructor', 'admin']),
  [body('courseId').isMongoId().withMessage('Valid courseId is required')],
  progressController.enroll
);

router.get('/mine', auth(['student', 'instructor', 'admin']), progressController.getMyEnrollments);
router.get('/:id', auth(['student', 'instructor', 'admin']), progressController.getCourseProgress);

router.post(
  '/:id/lessons',
  auth(['student', 'instructor', 'admin']),
  [
    body('lessonId').isString().withMessage('Valid lessonId is required'),
    body('completed').optional().isBoolean(),
    body('response').optional().isObject(),
  ],
  progressController.updateLessonProgress
);

module.exports = router;
