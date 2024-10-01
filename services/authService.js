// services/authService.js
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.registerUser = async (firstName, lastName, email, password) => {
  // Check if the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
      throw new Error('Email already in use');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user with the hashed password
  const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
  });

  // Save the user to the database
  await newUser.save();

  // Return the new user (you might want to exclude the password in the response)
  return newUser;
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
