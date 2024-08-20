// controllers/cartController.js
const cartService = require('../services/cartService');

exports.addToCart = async (req, res) => {
    try {
      const { userId, productId, quantity, size } = req.body;
      if (!userId || !productId || !quantity || !size) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      const cart = await cartService.addToCart(userId, productId, quantity, size);
      res.status(200).json({ message: 'Item added to cart successfully', cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getCart = async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        throw new Error('User ID is missing in request');
      }
  
      const userId = req.user.id;
      const cart = await cartService.getCartByUserId(userId);
      res.status(200).json(cart);
    } catch (error) {
      console.error('Failed to get cart:', error.message);
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateCartItemQuantity = async (req, res) => {
    try {
        const userId = req.user.id;  
        const { productId, size, quantity } = req.body;
        const updatedCart = await cartService.updateCartItemQuantity(userId, productId, size, quantity);
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error('Failed to update cart item quantity:', error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.removeCartItem = async (req, res) => {
  try {
      const userId = req.user.id;  
      const { productId, size } = req.body;
      const updatedCart = await cartService.removeCartItem(userId, productId, size);
      res.status(200).json(updatedCart);
  } catch (error) {
      console.error('Failed to remove cart item:', error.message);
      res.status(500).json({ message: error.message });
  }
};
exports.getCartForBilling = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using some middleware to get the authenticated user's ID
    
    const cart = await cartService.getCartWithUserDetails(userId);
    
    res.status(200).json(cart);
  } catch (error) {
    console.error('Failed to get cart for billing:', error.message);
    res.status(500).json({ message: 'Failed to retrieve cart details' });
  }
};