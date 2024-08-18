const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },  
  parentCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null }, // Liên kết tới danh mục cha
  description: { type: String },
 });

module.exports = mongoose.model('Category', categorySchema);
