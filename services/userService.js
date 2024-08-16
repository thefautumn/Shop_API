
const User = require('../models/User');

exports.getUserById = async (userId) => {
  return await User.findById(userId);
};

exports.getAllUsers = async () => {
  return await User.find();
};

exports.updateUserById = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

exports.deleteUserById = async (userId) => {
  return await User.findByIdAndDelete(userId);
};


 