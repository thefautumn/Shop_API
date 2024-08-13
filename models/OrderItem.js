// models/OrderItem.js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Mã sản phẩm
  name: { type: String, required: true }, // Tên mặt hàng
  price: { type: Number, required: true }, // Giá của mặt hàng
  size: { type: String, required: true }, // Kích cỡ của mặt hàng
  quantity: { type: Number, required: true }, // Số lượng mặt hàng
  imageUrl: { type: String, required: true }, // Hình ảnh của mặt hàng
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true } // Liên kết tới bảng Order
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
