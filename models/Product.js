const mongoose = require('mongoose');
const stockSchema = require('./Stock');  
const reviewSchema = require('./Review'); 

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  price: { type: Number, required: true }, 
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Cate', required: true }, 
  gender: { type: String, enum: ['Nam', 'Nữ'], required: true },  
  imageUrl: { type: [String], default: [] }, // Array of strings, default to empty array
  stocks: [stockSchema], 
  reviews: [reviewSchema]  
});

module.exports = mongoose.model('Product', productSchema);
