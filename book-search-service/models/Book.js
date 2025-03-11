const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  publishedDate: {
    type: Date,
    required: true
  },
  genre: {
    type: String,
    enum: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Technology'],
    required: true
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', bookSchema);