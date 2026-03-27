const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  addLesson,
  updateLesson,
  deleteLesson,
  getLessonsByCourse,
} = require('../controllers/lessons');
const instructor = require('../middlewares/instructor');

// @route   POST api/courses/:courseId/lessons
// @desc    Add a lesson to a course
// @access  Private (Instructor/Admin)
router.post('/', instructor, addLesson);

// @route   PUT api/courses/:courseId/lessons/:lessonId
// @desc    Update a lesson
// @access  Private (Instructor/Admin)
router.put('/:lessonId', instructor, updateLesson);

// @route   DELETE api/courses/:courseId/lessons/:lessonId
// @desc    Delete a lesson
// @access  Private (Instructor/Admin)
router.delete('/:lessonId', instructor, deleteLesson);

// @route   GET api/courses/:courseId/lessons
// @desc    Get all lessons for a course
// @access  Public
router.get('/', getLessonsByCourse);

module.exports = router;
