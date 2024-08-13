// models/Stock.js
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  size: { type: String, required: true },  
  quantity: { type: Number, required: true }  
});

module.exports = stockSchema;
