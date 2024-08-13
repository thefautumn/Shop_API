const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên danh mục (ví dụ: Nam, Nữ, Quần, Áo)
  parentCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null }, // Liên kết tới danh mục cha
  description: { type: String },
 });

module.exports = mongoose.model('Category', categorySchema);
