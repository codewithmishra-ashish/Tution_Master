const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  thumbnail: { type: String },
  
  // Content Links
  notesLink: { type: String }, 
  homeworkLink: { type: String },
  
  // For Classroom
  lectures: [{
    title: String,
    videoUrl: String,
    isLocked: { type: Boolean, default: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);