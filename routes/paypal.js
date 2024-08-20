const express = require('express');
const router = express.Router();
const paypalController = require('../controllers/paypalController'); // Import PayPal controller

// Định nghĩa route cho việc tạo đơn hàng
router.post('/create-order', paypalController.createOrder);

// Định nghĩa route cho việc hoàn tất đơn hàng
router.post('/capture-order', paypalController.captureOrder);

module.exports = router;
