const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  addReview,
  updateReview,
  deleteReview,
  getReviewsByCourse,
} = require('../controllers/reviews');
const auth = require('../middlewares/auth');

// @route   POST api/courses/:courseId/reviews
// @desc    Add a review to a course
// @access  Private (Student)
router.post('/', auth, addReview);

// @route   PUT api/courses/:courseId/reviews/:reviewId
// @desc    Update a review
// @access  Private (Student)
router.put('/:reviewId', auth, updateReview);

// @route   DELETE api/courses/:courseId/reviews/:reviewId
// @desc    Delete a review
// @access  Private (Student)
router.delete('/:reviewId', auth, deleteReview);

// @route   GET api/courses/:courseId/reviews
// @desc    Get all reviews for a course
// @access  Public
router.get('/', getReviewsByCourse);

module.exports = router;
