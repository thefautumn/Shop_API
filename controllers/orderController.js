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

  exports.deleteOrder = async (req, res) => {
    const { orderId } = req.params;
    const userId = req.user.id;  // Lấy userId từ token đã giải mã
  
    try {
      // Tìm đơn hàng bằng service
      const order = await orderService.findOrderById(orderId);
  
      // Kiểm tra quyền sở hữu
      if (order.userId.toString() !== userId) {
        return res.status(403).json({ message: 'You do not have permission to delete this order' });
      }
  
      // Xóa đơn hàng bằng service
      const result = await orderService.deleteOrderById(orderId);
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error deleting order:', error);
      return res.status(500).json({ message: error.message });
    }
  };
  exports.updateOrderStatus = async (req, res) => {
    const { orderStatus } = req.body;
    const { orderId } = req.params;
  
    console.log('Order ID:', orderId);
    console.log('Order status received:', orderStatus);
  
    try {
      // Check if the orderStatus is valid
      if (!orderStatus) {
        return res.status(400).json({ message: 'Order status is required' });
      }
  
      // Call the service to update the status
      const updatedOrder = await orderService.updateOrderStatus(orderId, orderStatus);
  
      console.log('Updated order status:', updatedOrder);
  
      return res.status(200).json(updatedOrder);
    } catch (error) {
      console.error('Error updating order:', error);
      return res.status(500).json({ message: error.message });
    }
  };
  
  exports.getAllOrders = async (req, res) => {
    try {
      const orders = await orderService.getAllOrders(); // Gọi service để lấy đơn hàng
    //   console.log('orders: ' + orders)
      return res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({ message: error.message });
    }
  };