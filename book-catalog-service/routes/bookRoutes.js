const express = require('express');
const router = express.Router();
const { adminCheck } = require('../middleware/auth');
const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

// Public routes
router.get('/', getAllBooks);          // GET /api/books
router.get('/search', getBook);        // GET /api/books/search?id=...&author=...&category=...

// Admin-protected routes
router.post('/', adminCheck, createBook);          // POST /api/books
router.put('/:id', adminCheck, updateBook);        // PUT /api/books/:id
router.delete('/:id', adminCheck, deleteBook);     // DELETE /api/books/:id

module.exports = router;