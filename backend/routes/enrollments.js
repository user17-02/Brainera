const express = require('express');
const router = express.Router();
const { enrollStudent, getStudentEnrollments, createEnrollmentByAdmin, getStudentsForInstructorCourse } = require('../controllers/enrollmentController');
const auth = require('../middlewares/auth'); // Assuming you have an auth middleware
const admin = require('../middlewares/admin'); // Import admin middleware
const instructor = require('../middlewares/instructor'); // Import instructor middleware

// @route   POST api/enrollments
// @desc    Enroll a student in a course after payment
// @access  Private
router.post('/', auth, enrollStudent);

// @route   GET api/enrollments/my-courses
// @desc    Get all courses a student is enrolled in
// @access  Private
router.get('/my-courses', auth, getStudentEnrollments);

// @route   POST api/enrollments/admin
// @desc    Admin manually enrolls a student in a course
// @access  Private (Admin)
router.post('/admin', admin, createEnrollmentByAdmin);

// @route   GET api/enrollments/course/:courseId/students
// @desc    Get students enrolled in a specific course for its instructor
// @access  Private (Instructor, owner of the course)
router.get('/course/:courseId/students', auth, instructor, getStudentsForInstructorCourse);

module.exports = router;