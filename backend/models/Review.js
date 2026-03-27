const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent user from submitting more than one review per course
ReviewSchema.index({ courseId: 1, studentId: 1 }, { unique: true });


module.exports = mongoose.model('Review', ReviewSchema);
