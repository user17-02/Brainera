const Review = require('../models/Review');
const Enrollment = require('../models/Enrollment');

// @route   POST api/courses/:courseId/reviews
// @desc    Add a review to a course
// @access  Private (Student)
exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { courseId } = req.params;

  try {
    // Check if user is enrolled in the course
    const enrolled = await Enrollment.findOne({
      studentId: req.user.id,
      courseId,
    });

    if (!enrolled) {
      return res
        .status(403)
        .json({ msg: 'You must be enrolled in a course to review it' });
    }

    const review = await Review.create({
      studentId: req.user.id,
      courseId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'You have already reviewed this course' });
    }
    res.status(500).send('Server Error');
  }
};

// @route   PUT api/courses/:courseId/reviews/:reviewId
// @desc    Update a review
// @access  Private (Student)
exports.updateReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    let review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    // Check if user is the owner of the review
    if (review.studentId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    review = await Review.findByIdAndUpdate(
      req.params.reviewId,
      { $set: { rating, comment } },
      { new: true, runValidators: true }
    );

    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   DELETE api/courses/:courseId/reviews/:reviewId
// @desc    Delete a review
// @access  Private (Student)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    // Check if user is the owner of the review
    if (review.studentId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await review.remove();

    res.json({ msg: 'Review removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET api/courses/:courseId/reviews
// @desc    Get all reviews for a course
// @access  Public
exports.getReviewsByCourse = async (req, res) => {
  try {
    const reviews = await Review.find({ courseId: req.params.courseId }).populate('studentId', ['name']);
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
