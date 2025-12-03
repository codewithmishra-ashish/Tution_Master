const router = require('express').Router();
const User = require('../models/User');

// UPDATE USER PROFILE
router.put('/update-profile/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
            address: req.body.address,
            phone: req.body.phone,
            profilePic: req.body.profilePic,
            isProfileComplete: true // Mark as complete
        }
      },
      { new: true }
    );
    // Remove password before sending back
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;