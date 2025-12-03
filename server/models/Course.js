const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  thumbnail: { type: String }, // We will store the Image URL
  category: { type: String },
  teacher: { type: String, default: "Tution Mater" },
  videos: [{
    title: String,
    videoUrl: String,
    isFree: { type: Boolean, default: false } // For Demo videos
  }]
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);