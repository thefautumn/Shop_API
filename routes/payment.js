// src/routes/paymentRoutes.js
const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create-order', authMiddleware,paymentController.createOrder);
router.get('/success', paymentController.handleSuccess);
router.get('/cancel', paymentController.handleCancel);

module.exports = router;
