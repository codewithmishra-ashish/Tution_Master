const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  category: String,
  thumbnail: String,
  // New Content Fields
  notesLink: { type: String }, // URL to PDF drive/S3
  homeworkLink: { type: String }, // URL to assignments
  lectures: [{
    title: String,
    videoUrl: String,
    isLocked: { type: Boolean, default: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);