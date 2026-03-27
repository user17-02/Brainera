const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');

// @route   POST api/courses
// @desc    Create a course
// @access  Private (Instructor/Admin)
exports.createCourse = async (req, res) => {
  const { title, description, category, price, duration, level, status } = req.body;
  // If a file is uploaded, use its filename. Otherwise, check if a thumbnail URL was provided in req.body.
  const thumbnail = req.file ? `/uploads/images/${req.file.filename}` : req.body.thumbnail;

  if (!thumbnail) {
      return res.status(400).json({ msg: 'Please provide a thumbnail image.' });
  }

  try {
    const newCourse = new Course({
      title,
      description,
      category,
      price,
      duration,
      level,
      thumbnail,
      instructor: req.user.id,
      status: status || 'draft',
    });

    const course = await newCourse.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { createdCourses: course._id },
    });

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   PUT api/courses/:id
// @desc    Update a course
// @access  Private (Instructor/Admin)
exports.updateCourse = async (req, res) => {
  const { title, description, category, price, duration, level, thumbnail, status } =
    req.body;

  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    // Check if user is the instructor of the course OR an admin
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, category, price, duration, level, thumbnail, status } },
      { new: true }
    );

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   DELETE api/courses/:id
// @desc    Delete a course
// @access  Private (Instructor/Admin)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    // Check if user is the instructor of the course
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await course.remove();

    res.json({ msg: 'Course removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   GET api/courses
// @desc    Get all courses
// @access  Public
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: 'published' }).populate('instructor', ['name']);
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   GET api/courses/:id
// @desc    Get course by ID
// @access  Public
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', ['name'])
      .populate('lessons', ['title', 'content', 'videoUrl', 'order']);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Course not found' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   GET api/courses/category/:categoryName
// @desc    Get courses by category
// @access  Public
exports.getCoursesByCategory = async (req, res) => {
    try {
        const courses = await Course.find({ category: req.params.categoryName, status: 'published' }).populate('instructor', ['name']);
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};


// @route   GET api/courses/my-courses
// @desc    Get all courses for authenticated instructor with review summaries
// @access  Private (Instructor)
exports.getInstructorCourses = async (req, res) => {
    console.log('Fetching courses for instructor ID:', req.user.id);
    try {
        const instructorId = new mongoose.Types.ObjectId(req.user.id);
        const courses = await Course.aggregate([
            {
                $match: {
                    instructor: instructorId // Match courses by the authenticated instructor's ID
                }
            },
            {
                $lookup: {
                    from: 'reviews', // The collection name for reviews
                    localField: '_id',
                    foreignField: 'courseId',
                    as: 'courseReviews'
                }
            },
            {
                $addFields: {
                    averageRating: { $avg: '$courseReviews.rating' },
                    reviewCount: { $size: '$courseReviews' }
                }
            },
            {
                $project: {
                    courseReviews: 0 // Remove the raw reviews array from the final output
                }
            }
        ]);
        console.log(`Found ${courses.length} courses for instructor ${req.user.id}`);
        res.json(courses);
    } catch (err) {
        console.error('Error in getInstructorCourses:', err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};


// @route   GET api/courses/instructor/:instructorId
// @desc    Get courses by instructor ID
// @access  Public
exports.getCoursesByInstructorId = async (req, res) => {
    try {
        const courses = await Course.find({ instructor: req.params.instructorId, status: 'published' }).populate('instructor', ['name']);
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};
