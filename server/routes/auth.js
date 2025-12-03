const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER (Students)
router.post('/register', async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: 'student' // Default is student
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN (Handles Admin & Students)
router.post('/login', async (req, res) => {
  try {
    // --- SPECIAL ADMIN LOGIC ---
    if (req.body.email === 'admin@test.com') {
        let adminUser = await User.findOne({ email: 'admin@test.com' });

        // If Admin doesn't exist yet, create them automatically!
        if (!adminUser) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt); // Use the password provided

            adminUser = new User({
                name: "Tution Mater (Admin)",
                email: "admin@test.com",
                password: hashedPassword,
                role: "admin",
                isProfileComplete: true
            });
            await adminUser.save();
            console.log("✅ Super Admin Auto-Created!");
        }
        
        // Verify Password for Admin
        const validPass = await bcrypt.compare(req.body.password, adminUser.password);
        if (!validPass) return res.status(400).json({ message: "Wrong Admin Password" });

        // Generate Token
        const token = jwt.sign({ id: adminUser._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: "3d" });
        const { password, ...others } = adminUser._doc;
        
        return res.status(200).json({ ...others, token });
    }

    // --- STANDARD STUDENT LOGIC ---
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "3d" });
    const { password, ...others } = user._doc;
    
    res.status(200).json({ ...others, token });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;