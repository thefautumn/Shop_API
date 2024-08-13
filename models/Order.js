// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Liên kết tới người dùng
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem', required: true }], // Mảng chứa các `OrderItem`
  totalPrice: { type: Number, required: true }, // Tổng giá trị của đơn hàng
  orderStatus: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' }, // Trạng thái của đơn hàng
  paymentMethod: { type: String, required: true }, // Phương thức thanh toán
  shippingAddress: {
    name: { type: String, required: true }, // Tên người nhận
    phone: { type: String, required: true }, // Số điện thoại người nhận
    province: { type: String, required: true }, // Tỉnh/Thành phố
    district: { type: String, required: true }, // Quận/Huyện
    ward: { type: String, required: true }, // Phường/Xã
    detailedAddress: { type: String, required: true } // Địa chỉ chi tiết
  },
  
  orderDate: { type: Date, default: Date.now }, // Ngày đặt hàng
  deliveryDate: { type: Date }, // Ngày giao hàng (có thể cập nhật sau)
  trackingNumber: { type: String }, // Số theo dõi (tùy chọn)
  notes: { type: String } // Ghi chú thêm của người dùng
});

module.exports = mongoose.model('Order', orderSchema);
