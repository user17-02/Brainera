const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  payment: {
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    transactionId: {
      type: String,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
