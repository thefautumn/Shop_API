const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem', required: true }],
  totalPrice: { type: Number, required: true },
  orderStatus: { type: String, enum: ['Pending', 'Processing', 'Completed', 'Delivered', 'Cancelled'], default: 'Pending' },
  paymentMethod: { type: String, enum: ['Credit Card', 'PayPal', 'COD', 'VNPay'], required: true },
  shippingAddress: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    province: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    detailedAddress: { type: String, required: true }
  },
  orderDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Refunded'], default: 'Pending' }, // Tuỳ chọn
  transactionId: { type: String }, // Tuỳ chọn
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }, // Tuỳ chọn
  deliveryDate: { type: Date }, // Tuỳ chọn
  trackingNumber: { type: String }, // Tuỳ chọn
  notes: { type: String } // Tuỳ chọn
});

module.exports = mongoose.model('Order', orderSchema);
