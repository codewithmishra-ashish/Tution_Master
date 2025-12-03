const authRoutes = require('./routes/auth');
const courseRoute = require('./routes/courses');
const userRoute = require('./routes/users');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load config
dotenv.config();

const app = express();

// Middleware (Allows us to read JSON and talk to React)
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// Basic Route (To test if server works)
app.get('/', (req, res) => {
  res.send('Tution Mater API is Running...');
});
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoute);
app.use('/api/users', userRoute);

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));