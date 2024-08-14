const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header is missing or invalid' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = authenticateToken;
