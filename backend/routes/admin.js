const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsers, getAllCourses, getAllEnrollments, getAllReviews, deleteUser, deleteCourse, deleteEnrollment, deleteReview, updateUser, createUserByAdmin, getAllInstructors, getAdminInstructorCourses, getAdminCourseEnrollments } = require('../controllers/admin');
const { updateCourse } = require('../controllers/courses'); // Import updateCourse from courses controller
const admin = require('../middlewares/admin');
const upload = require('../middlewares/upload'); // Import upload middleware

// @route   POST api/admin/users
// @desc    Create a user by Admin
// @access  Private (Admin)
router.post('/users', admin, createUserByAdmin);

// @route   GET api/admin/stats
// @desc    Get dashboard stats
// @access  Private (Admin)
router.get('/stats', admin, getDashboardStats);

// @route   GET api/admin/users
// @desc    Get all users
// @access  Private (Admin)
router.get('/users', admin, getAllUsers);
// @route   DELETE api/admin/users/:id
// @desc    Delete a user
// @access  Private (Admin)
router.delete('/users/:id', admin, deleteUser);
// @route   PUT api/admin/users/:id
// @desc    Update a user
// @access  Private (Admin)
router.put('/users/:id', admin, updateUser);

// @route   GET api/admin/instructors
// @desc    Get all users with role 'instructor'
// @access  Private (Admin)
router.get('/instructors', admin, getAllInstructors);

// @route   GET api/admin/instructors/:instructorId/courses
// @desc    Get all courses for a specific instructor (admin view)
// @access  Private (Admin)
router.get('/instructors/:instructorId/courses', admin, getAdminInstructorCourses);

// @route   GET api/admin/courses
// @desc    Get all courses
// @access  Private (Admin)
router.get('/courses', admin, getAllCourses);
// @route   DELETE api/admin/courses/:id
// @desc    Delete a course
// @access  Private (Admin)
router.delete('/courses/:id', admin, deleteCourse);
// @route   PUT api/admin/courses/:id
// @desc    Update a course
// @access  Private (Admin)
router.put('/courses/:id', admin, upload.single('imageFile'), updateCourse);

// @route   GET api/admin/courses/:courseId/enrollments
// @desc    Get all enrollments for a specific course (admin view)
// @access  Private (Admin)
router.get('/courses/:courseId/enrollments', admin, getAdminCourseEnrollments);

// @route   GET api/admin/enrollments
// @desc    Get all enrollments
// @access  Private (Admin)
router.get('/enrollments', admin, getAllEnrollments);
// @route   DELETE api/admin/enrollments/:id
// @desc    Delete an enrollment
// @access  Private (Admin)
router.delete('/enrollments/:id', admin, deleteEnrollment);

// @route   GET api/admin/reviews
// @desc    Get all reviews
// @access  Private (Admin)
router.get('/reviews', admin, getAllReviews);
// @route   DELETE api/admin/reviews/:id
// @desc    Delete a review
// @access  Private (Admin)
router.delete('/reviews/:id', admin, deleteReview);


module.exports = router;
