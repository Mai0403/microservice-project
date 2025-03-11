const express = require('express');
const router = express.Router();
const { searchByTitle } = require('../controllers/searchController');

// Public route
router.get('/title', searchByTitle); // GET /api/search/title?title=...

module.exports = router;