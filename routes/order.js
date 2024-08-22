const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

// Tạo đơn hàng (order creation)
router.post('/create', authMiddleware, orderController.createOrder);

// Hoàn tất thanh toán (complete payment)
router.post('/complete-payment', authMiddleware, orderController.completePayment);

router.get('/:userId', authMiddleware, orderController.getUserOrders);

module.exports = router;
