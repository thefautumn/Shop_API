const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true }
});

module.exports = mongoose.model('CartItem', cartItemSchema);
