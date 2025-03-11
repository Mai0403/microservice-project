const jwt = require('jsonwebtoken');

const adminCheck = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).send({ error: 'Access denied. Admin privileges required.' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send({ error: 'Invalid token.' });
  }
};

module.exports = { adminCheck };