// controllers/authController.js
const { exists } = require('../models/Category');
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
    res.status(401).json({ message: 'Email or password does not exists/match' });
  }
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await authService.registerUser(firstName, lastName, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Email đã tồn tại' });
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
