const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBook = async (req, res) => {
  try {
    const { id, author, category } = req.query;
    const query = {};

    // Handle ID search
    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid book ID format' });
      }
      query._id = new mongoose.Types.ObjectId(id);
    }

    // Handle author search
    if (author) {
      query.author = { $regex: new RegExp(author, 'i') }; // Case-insensitive
    }

    // Handle category search (assuming 'genre' is the field name)
    if (category) {
      query.genre = { $regex: new RegExp(category, 'i') }; // Case-insensitive
    }

    // If no valid query parameters
    if (Object.keys(query).length === 0) {
      return res.status(400).json({ 
        message: 'Please provide at least one search parameter (id, author, or category)' 
      });
    }

    const books = await Book.find(query);
    
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found matching your criteria' });
    }

    res.json(books);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};