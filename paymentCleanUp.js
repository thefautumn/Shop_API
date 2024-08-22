// paymentCleanup.js
const cron = require('node-cron');
const Payment = require('./models/Payment');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');

// This job runs every minute and checks for payments that are older than 10 minutes and still pending
cron.schedule('* * * * *', async () => {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  try {
    // Find all payments that are still pending and were created more than 10 minutes ago
    const pendingPayments = await Payment.find({ 
      paymentStatus: 'Pending', 
      paymentDate: { $lt: tenMinutesAgo } 
    });

    for (const payment of pendingPayments) {
      // Find the associated order
      const order = await Order.findById(payment.orderId);
      
      if (order) {
        // Delete all OrderItems associated with the order
        await OrderItem.deleteMany({ orderId: order._id });

        // Delete the associated order
        await Order.findByIdAndDelete(order._id);
      }

      // Delete the payment record itself
      await Payment.findByIdAndDelete(payment._id);
      
      console.log(`Deleted payment, order, and order items with Payment ID ${payment._id} due to timeout.`);
    }
  } catch (error) {
    console.error('Error during payment cleanup:', error.message);
  }
});
