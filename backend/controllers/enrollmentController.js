const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course'); // Assuming you might need Course details
const User = require('../models/User'); // Assuming you might need User details

// @route   POST api/enrollments
// @desc    Enroll a student in a course after payment
// @access  Private (Auth middleware required)
exports.enrollStudent = async (req, res) => {
  const { userId, courseId, pricePaid, paymentDetails } = req.body;

  try {
    // 1. Basic validation
    if (!userId || !courseId || !pricePaid) {
      return res.status(400).json({ msg: 'Missing required enrollment data.' });
    }

    // 2. Verify Course existence (optional but good practice)
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found.' });
    }

    // 3. Check if student is already enrolled
    let existingEnrollment = await Enrollment.findOne({ studentId: userId, courseId });
    if (existingEnrollment) {
      // If already enrolled and payment was successful, no need to re-enroll
      if (existingEnrollment.payment.status === 'completed') {
        return res.status(200).json({ msg: 'Student is already enrolled in this course with successful payment.', enrollment: existingEnrollment });
      }
      // If existing but payment was not completed, update it
      existingEnrollment.payment.status = 'completed';
      existingEnrollment.payment.amount = pricePaid;
      existingEnrollment.payment.transactionId = paymentDetails?.transactionId || `mock_txn_${Date.now()}`;
      existingEnrollment.payment.paymentDate = Date.now();
      await existingEnrollment.save();
      return res.status(200).json({ msg: 'Enrollment updated with successful payment.', enrollment: existingEnrollment });
    }

    // 4. Create new enrollment
    const newEnrollment = new Enrollment({
      studentId: userId,
      courseId,
      payment: {
        status: 'completed',
        amount: pricePaid,
        currency: paymentDetails?.currency || 'USD',
        transactionId: paymentDetails?.transactionId || `mock_txn_${Date.now()}`,
        paymentDate: Date.now(),
      },
    });

    await newEnrollment.save();

    res.status(201).json({ msg: 'Enrollment successful!', enrollment: newEnrollment });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET api/enrollments/my-courses
// @desc    Get all courses a student is enrolled in
// @access  Private (Auth middleware required)
exports.getStudentEnrollments = async (req, res) => {
  try {
    const studentId = req.user.id; // User ID comes from auth middleware

    const enrollments = await Enrollment.find({ studentId })
      .populate({
        path: 'courseId',
        select: 'title category price thumbnail description instructor', // Include instructor field
        populate: {
          path: 'instructor',
          select: 'name' // Populate only the name of the instructor
        }
      })
      .select('courseId enrolledAt payment.status'); // Select only necessary fields

    if (!enrollments || enrollments.length === 0) {
      return res.status(200).json({ msg: 'No enrollments found for this student.', enrollments: [] });
    }

    res.status(200).json({ enrollments });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST api/enrollments/admin
// @desc    Admin manually enrolls a student in a course
// @access  Private (Admin middleware required)
exports.createEnrollmentByAdmin = async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    // 1. Basic validation
    if (!studentId || !courseId) {
      return res.status(400).json({ msg: 'Missing studentId or courseId.' });
    }

    // 2. Verify User existence
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found.' });
    }

    // 3. Verify Course existence
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found.' });
    }

    // 4. Check if student is already enrolled
    let existingEnrollment = await Enrollment.findOne({ studentId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ msg: 'Student is already enrolled in this course.' });
    }

    // 5. Create new enrollment
    const newEnrollment = new Enrollment({
      studentId,
      courseId,
      payment: {
        status: 'completed',
        amount: course.price, // Automatically set price from course
        currency: 'USD',
        transactionId: `ADMIN_ENROLL_${Date.now()}`, // Admin specific transaction ID
        paymentDate: Date.now(),
      },
    });

    await newEnrollment.save();

    res.status(201).json({ msg: 'Enrollment created successfully!', enrollment: newEnrollment });

  } catch (err) {
    console.error(err.message);
    // Handle Mongoose cast errors specifically if IDs are malformed
    if (err.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'Invalid Student ID or Course ID format.' });
    }
    res.status(500).send('Server error');
  }
};

// @route   GET /api/enrollments/course/:courseId/students
// @desc    Get students enrolled in a specific course for its instructor
// @access  Private (Instructor, owner of the course)
exports.getStudentsForInstructorCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user.id;

    // 1. Verify course existence and ownership
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    if (course.instructor.toString() !== instructorId) {
      return res.status(403).json({ msg: 'Access denied. You are not the instructor of this course.' });
    }

    // 2. Find all enrollments for this course
    const enrollments = await Enrollment.find({ courseId })
      .populate('studentId', 'name email'); // Populate student details (name, email)

    if (!enrollments || enrollments.length === 0) {
      return res.status(200).json({ msg: 'No students enrolled in this course yet.', students: [] });
    }

    // Extract student details from enrollments
    const students = enrollments.map(enrollment => ({
      studentId: enrollment.studentId._id,
      name: enrollment.studentId.name,
      email: enrollment.studentId.email,
      enrolledAt: enrollment.enrolledAt,
      paymentStatus: enrollment.payment.status,
    }));

    res.status(200).json({ students });

  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'Invalid Course ID format.' });
    }
    res.status(500).send('Server error');
  }
};