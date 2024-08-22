// src/controllers/paymentController.js
const paymentService = require('../services/paymentService');
const paypalService = require('../services/paypalService');

async function createOrder(req, res) {
    const userId = req.user.id;
    const { orderId, amount } = req.body;

    try {
        const paypalOrder = await paypalService.createPaypalOrder(amount);
        const payment = await paymentService.createPayment(orderId, userId, 'PayPal', paypalOrder.id, amount);

        res.status(200).json({ orderId: paypalOrder.id, url: paypalOrder.links[1].href });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create PayPal order');
    }
}

async function handleSuccess(req, res) {
    const { orderId, token } = req.body; // Expecting orderId (ObjectId) and token (string) from the frontend.

  try {
    // Find the order by its ID (ObjectId)
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Capture the payment using PayPal token
    const captureResponse = await paypalService.capturePaypalPayment(token);

    // Update order status to completed
    order.paymentStatus = 'Completed';
    order.transactionId = captureResponse.id;
    order.orderStatus = 'Processing';
    await order.save();

    // Optionally update the Payment record
    if (order.paymentId) {
      const payment = await Payment.findById(order.paymentId);
      if (payment) {
        payment.paymentStatus = 'Completed';
        payment.transactionId = captureResponse.id;
        await payment.save();
      }
    }

    res.status(200).json({ message: 'Payment successful' });
  } catch (error) {
    console.error('Payment failed:', error);
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
}

function handleCancel(req, res) {
    res.send('Payment cancelled');
}

module.exports = {
    createOrder,
    handleSuccess,
    handleCancel,
};
