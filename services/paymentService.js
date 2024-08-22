// src/services/paymentService.js
const Payment = require('../models/Payment');
const Order = require('../models/Order');

async function createPayment(orderId, userId, paymentMethod, transactionId, amount) {
    const payment = new Payment({
        orderId,
        userId,
        paymentMethod,
        paymentStatus: 'Pending',
        transactionId,
        amount,
    });

    return await payment.save();
}

async function updatePaymentStatus(transactionId, status) {
    return await Payment.findOneAndUpdate(
        { transactionId },
        { paymentStatus: status },
        { new: true }
    );
}

async function updateOrderPaymentStatus(orderId, status) {
    return await Order.findByIdAndUpdate(orderId, { paymentStatus: status });
}

module.exports = {
    createPayment,
    updatePaymentStatus,
    updateOrderPaymentStatus,
};
