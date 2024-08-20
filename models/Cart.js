const mongoose = require('mongoose');
const cartItemSchema = require('./CartItem');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem', required: true }],  // Updated to an array of ObjectIds
  totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Cart', cartSchema);
