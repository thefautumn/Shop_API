// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add-to-cart', cartController.addToCart);
router.get('/', authMiddleware, cartController.getCart);
router.put('/update-quantity', authMiddleware, cartController.updateCartItemQuantity);
router.delete('/remove-item', authMiddleware, cartController.removeCartItem);
router.get('/billing-information', authMiddleware, cartController.getCartForBilling);
router.delete('/clear-cart', authMiddleware, cartController.clearCart);
module.exports = router;
