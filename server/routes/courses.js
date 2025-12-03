const router = require('express').Router();
const Course = require('../models/Course');
const User = require('../models/User');

// 1. CREATE A NEW BATCH
router.post('/', async (req, res) => {
  try {
    console.log("📥 Receiving New Course Request:", req.body);

    // Validation
    if (!req.body.title || !req.body.price) {
        console.log("❌ Missing Title or Price");
        return res.status(400).json({ message: "Title and Price are required" });
    }

    const newCourse = new Course(req.body);
    const savedCourse = await newCourse.save();
    
    console.log("✅ Course Saved to DB:", savedCourse.title);
    res.status(200).json(savedCourse);
  } catch (err) {
    console.error("❌ Database Error:", err);
    res.status(500).json({ message: err.message });
  }
});

// 2. GET ALL BATCHES
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. GET SINGLE BATCH
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

    if (!userId) return res.status(400).json("User ID required");

    // Add course to user
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { $addToSet: { enrolledCourses: courseId } },
      { new: true }
    );

    // Return updated user (without password)
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;