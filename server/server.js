const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware (Allows JSON data and Cross-Origin requests)
app.use(express.json());
app.use(cors());

// --- DATABASE CONNECTION ---
// If MONGO_URI is missing, it will crash, so check your .env file!
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// --- ROUTES ---
const authRoute = require('./routes/auth');
const courseRoute = require('./routes/courses');
const userRoute = require('./routes/users');

app.use('/api/auth', authRoute);
app.use('/api/courses', courseRoute); // <--- THIS LINE IS CRITICAL FOR COURSES
app.use('/api/users', userRoute);

// Basic Route
app.get('/', (req, res) => {
  res.send('Tution Mater API is Running...');
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));