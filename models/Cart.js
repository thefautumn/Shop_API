const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  items: [cartItemSchema],  
  totalPrice: { type: Number, required: true }  
});

module.exports = mongoose.model('Cart', cartSchema);
