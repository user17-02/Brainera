const express = require('express');
const router = express.Router();
const {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  getCoursesByCategory,
  getCoursesByInstructorId, // Renamed from getInstructorCourses
  getInstructorCourses,     // New function
} = require('../controllers/courses');
const auth = require('../middlewares/auth');
const instructor = require('../middlewares/instructor');
const upload = require('../middlewares/upload'); // Import upload middleware

// @route   POST api/courses
// @desc    Create a course
// @access  Private (Instructor/Admin)
router.post('/', auth, instructor, upload.single('imageFile'), createCourse);

// @route   PUT api/courses/:id
// @desc    Update a course
// @access  Private (Instructor/Admin)
router.put('/:id', instructor, updateCourse);

// @route   DELETE api/courses/:id
// @desc    Delete a course
// @access  Private (Instructor/Admin)
router.delete('/:id', instructor, deleteCourse);

// @route   GET api/courses
// @desc    Get all courses
// @access  Public
router.get('/', getAllCourses);

// @route   GET api/courses/my-courses
// @desc    Get all courses for the authenticated instructor
// @access  Private (Instructor)
router.get('/my-courses', auth, instructor, getInstructorCourses);

// @route   GET api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', getCourseById);

// @route   GET api/courses/category/:categoryName
// @desc    Get courses by category
// @access  Public
router.get('/category/:categoryName', getCoursesByCategory);

// @route   GET api/courses/instructor/:instructorId
// @desc    Get courses by instructor
// @access  Public
router.get('/instructor/:instructorId', getCoursesByInstructorId); // Use getCoursesByInstructorId

// @route   GET api/courses/my-courses
// @desc    Get all courses for the authenticated instructor
// @access  Private (Instructor)
router.get('/my-courses', auth, instructor, getInstructorCourses);


// Re-route into other resource routers
router.use('/:courseId/reviews', require('./reviews'));
router.use('/:courseId/lessons', require('./lessons'));

module.exports = router;
