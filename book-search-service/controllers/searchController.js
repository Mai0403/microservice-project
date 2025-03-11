const Book = require('../models/Book');

const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ message: 'Title is required for search' });
    }

    const books = await Book.find({ title: { $regex: new RegExp(title, 'i') } }); // Case-insensitive search

    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found with the given title' });
    }

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { searchByTitle };