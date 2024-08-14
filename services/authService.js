// services/authService.js
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await authService.registerUser(firstName, lastName, email, password);
    res.status(201).json(user);
  } catch (error) {
    if (error.message === 'Email already in use') {
      // Lỗi email đã tồn tại
      return res.status(400).json({ error: 'Email already in use' });
    }
    // Lỗi server hoặc lỗi khác không xác định
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};


exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
  return { token, userId: user.id };
};
