const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Review = require('../models/Review'); // Import Review model
const bcrypt = require('bcryptjs'); // Import bcrypt

// @route   POST api/admin/users
// @desc    Create a user by Admin
// @access  Private (Admin)
exports.createUserByAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      role: role || 'student', // Default to 'student' if role is not provided
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return user details excluding password
    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   GET api/admin/stats
// @desc    Get dashboard stats
// @access  Private (Admin)
exports.getDashboardStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const coursesCount = await Course.countDocuments();
    const enrollmentsCount = await Enrollment.countDocuments();

    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    const recentCourses = await Course.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      usersCount,
      coursesCount,
      enrollmentsCount,
      recentUsers,
      recentCourses,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   GET api/admin/users
// @desc    Get all users
// @access  Private (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password from results
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   GET api/admin/courses
// @desc    Get all courses
// @access  Private (Admin)
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name'); // Populate instructor name
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   GET api/admin/enrollments
// @desc    Get all enrollments
// @access  Private (Admin)
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate('studentId', 'name').populate('courseId', 'title'); // Populate student and course info
    res.json(enrollments);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   GET api/admin/reviews
// @desc    Get all reviews
// @access  Private (Admin)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('studentId', 'name').populate('courseId', 'title'); // Populate student and course info
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   DELETE api/admin/users/:id
// @desc    Delete a user
// @access  Private (Admin)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   DELETE api/admin/courses/:id
// @desc    Delete a course
// @access  Private (Admin)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    res.json({ msg: 'Course removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   DELETE api/admin/enrollments/:id
// @desc    Delete an enrollment
// @access  Private (Admin)
exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ msg: 'Enrollment not found' });
    }

    res.json({ msg: 'Enrollment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   DELETE api/admin/reviews/:id
// @desc    Delete a review
// @access  Private (Admin)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    res.json({ msg: 'Review removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   PUT api/admin/users/:id
// @desc    Update a user
// @access  Private (Admin)
exports.updateUser = async (req, res) => {
  const { name, email, role } = req.body; // Exclude password for now, handle separately if needed

  // Build user object
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (role) userFields.role = role;

  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    ).select('-password'); // Exclude password from returned user

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   GET api/admin/instructors
// @desc    Get all users with role 'instructor'
// @access  Private (Admin)
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: 'instructor' }).select('-password');
    res.json(instructors);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   GET api/admin/instructors/:instructorId/courses
// @desc    Get all courses for a specific instructor (admin view)
// @access  Private (Admin)
exports.getAdminInstructorCourses = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const courses = await Course.find({ instructor: instructorId })
      .populate('instructor', 'name')
      .populate('lessons', 'title order') // Populate lessons to show their count or details
      .select('title category price thumbnail status'); // Select relevant course fields

    res.json(courses);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'Invalid Instructor ID format.' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   GET api/admin/courses/:courseId/enrollments
// @desc    Get all enrollments for a specific course (admin view)
// @access  Private (Admin)
exports.getAdminCourseEnrollments = async (req, res) => {
  try {
    const { courseId } = req.params;
    const enrollments = await Enrollment.find({ courseId })
      .populate('studentId', 'name email') // Populate student details
      .populate('courseId', 'title'); // Populate course title for context

    if (!enrollments || enrollments.length === 0) {
      return res.status(200).json({ msg: 'No enrollments found for this course.', enrollments: [] });
    }

    res.json(enrollments);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'Invalid Course ID format.' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};