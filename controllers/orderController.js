const orderService = require('../services/orderService');
const cartService = require('../services/cartService');

exports.createOrder = async (req, res) => {
    try {
        const { paymentMethod } = req.body;  // Đảm bảo rằng paymentMethod được lấy từ body của request
        const orderData = {
            userId: req.user.id,  // Assuming `req.user` contains authenticated user ID
            items: req.body.items,
            totalPrice: req.body.totalPrice,
            shippingAddress: req.body.shippingAddress
        };

        const order = await orderService.createOrder(orderData, paymentMethod);
        res.status(201).json(order);
    } catch (error) {
        console.error('Failed to create order:', error.message);
        res.status(500).json({ message: 'Failed to create order' });
    }
};


exports.completePayment = async (req, res) => {
    try {
        const { orderId, transactionId } = req.body; // Lấy orderId và transactionId từ request body

        const order = await orderService.completePayment(orderId, transactionId);

        res.status(200).json(order);
    } catch (error) {
        console.error('Failed to complete payment:', error.message);
        res.status(500).json({ message: 'Failed to complete payment' });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
      const userId = req.user.id;
      const orders = await orderService.getUserOrders(userId);
      res.status(200).json(orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error.message);
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  };
