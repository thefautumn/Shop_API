// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Liên kết tới đơn hàng
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Liên kết tới người dùng
  paymentMethod: { type: String, required: true }, // Phương thức thanh toán (Credit Card, PayPal, COD, v.v.)
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Refunded'], default: 'Pending' }, // Trạng thái thanh toán
  transactionId: { type: String }, // Mã giao dịch từ cổng thanh toán (nếu có)
  amount: { type: Number, required: true }, // Số tiền thanh toán
  paymentDate: { type: Date, default: Date.now } // Ngày thực hiện thanh toán
});

module.exports = mongoose.model('Payment', paymentSchema);
