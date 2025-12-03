const router = require('express').Router();
const Course = require('../models/Course');
const User = require('../models/User');

// 1. CREATE A NEW BATCH (Admin Only)
router.post('/', async (req, res) => {
  try {
    console.log("Receiving Course Data:", req.body); // Debug Log
    const newCourse = new Course(req.body);
    const savedCourse = await newCourse.save();
    console.log("Course Saved:", savedCourse); // Debug Log
    res.status(200).json(savedCourse);
  } catch (err) {
    console.error("Error Saving Course:", err); // Print error to terminal
    res.status(500).json(err);
  }
});

// 2. GET ALL BATCHES
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. GET SINGLE BATCH (For Payment/Classroom)
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 4. ENROLL STUDENT
router.put('/enroll/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.body.userId;

    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { $addToSet: { enrolledCourses: courseId } },
      { new: true }
    );
    
    // Send back the updated user so frontend can update localStorage
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;