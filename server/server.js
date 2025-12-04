const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

const authRoute = require('./routes/auth');
const courseRoute = require('./routes/courses');
const userRoute = require('./routes/users');
const uploadRoute = require('./routes/upload');

app.use('/api/upload', uploadRoute);
app.use('/api/auth', authRoute);
app.use('/api/courses', courseRoute); 
app.use('/api/users', userRoute);

app.get('/', (req, res) => {
  res.send('Tution Mater API is Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));