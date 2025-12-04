const router = require('express').Router();
const upload = require('../utils/cloudinary'); // Import the utility we just made

// POST /api/upload
// The 'image' string here must match the form-data key from frontend
router.post('/', upload.single('image'), (req, res) => {
  try {
    // Return the URL that Cloudinary gave us
    res.status(200).json({ url: req.file.path });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;