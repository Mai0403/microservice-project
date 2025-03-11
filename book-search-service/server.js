require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/searchRoutes');

const app = express();

// Middleware
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/search', searchRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Book Search Service running on port ${PORT}`);
});