const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

// @route   POST api/courses/:courseId/lessons
// @desc    Add a lesson to a course
// @access  Private (Instructor/Admin)
exports.addLesson = async (req, res) => {
  const { title, content, videoUrl } = req.body;
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    // Check if user is the instructor of the course
    if (course.instructor.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get the order for the new lesson
    const order = course.lessons.length + 1;

    const newLesson = new Lesson({
      courseId,
      title,
      content,
      videoUrl,
      order,
    });

    const lesson = await newLesson.save();

    course.lessons.push(lesson._id);
    await course.save();

    res.json(lesson);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   PUT api/courses/:courseId/lessons/:lessonId
// @desc    Update a lesson
// @access  Private (Instructor/Admin)
exports.updateLesson = async (req, res) => {
  const { title, content, videoUrl, order } = req.body;
  const { courseId, lessonId } = req.params;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    // Check if user is the instructor of the course
    if (course.instructor.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    let lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(404).json({ msg: 'Lesson not found' });
    }

    lesson = await Lesson.findByIdAndUpdate(
      lessonId,
      { $set: { title, content, videoUrl, order } },
      { new: true }
    );

    res.json(lesson);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   DELETE api/courses/:courseId/lessons/:lessonId
// @desc    Delete a lesson
// @access  Private (Instructor/Admin)
exports.deleteLesson = async (req, res) => {
  const { courseId, lessonId } = req.params;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    // Check if user is the instructor of the course
    if (course.instructor.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(404).json({ msg: 'Lesson not found' });
    }

    await lesson.remove();

    // Remove lesson from course's lessons array
    course.lessons = course.lessons.filter(
      ({ _id }) => _id.toString() !== lessonId
    );
    await course.save();

    res.json({ msg: 'Lesson removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET api/courses/:courseId/lessons
// @desc    Get all lessons for a course
// @access  Public
exports.getLessonsByCourse = async (req, res) => {
  try {
    const lessons = await Lesson.find({ courseId: req.params.courseId }).sort({ order: 1 });
    res.json(lessons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
