// controllers/authController.js
const authService = require('../services/authService');
const { validationResult } = require('express-validator');

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const { token, userId } = await authService.loginUser(email, password);
    res.status(200).json({ token, userId });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    const user = await authService.registerUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.recover = (req, res) => {
  const { email } = req.body;
  // Add logic to send recovery email
  res.status(200).json({ message: 'Recovery email sent' });
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // Add logic to reset password using the token
  res.status(200).json({ message: 'Password reset successfully' });
};
