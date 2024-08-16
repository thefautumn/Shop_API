// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  rating: { type: Number, required: true, min: 1, max: 5 }, 
  createdAt: { type: Date, default: Date.now }  
});

module.exports = reviewSchema;
