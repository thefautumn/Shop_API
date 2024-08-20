// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'No token provided, authorization denied' });
  }
};


module.exports = authMiddleware;
