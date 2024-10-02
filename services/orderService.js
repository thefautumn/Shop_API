const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Payment = require('../models/Payment');

exports.createOrder = async (orderData, paymentMethod) => {
    try {
        if (!paymentMethod) {
            throw new Error('Payment method is required');
        }

        // Tạo đơn hàng trước để lấy orderId
        const order = new Order({
            userId: orderData.userId,
            items: [], // Ban đầu để trống, sẽ cập nhật sau
            totalPrice: orderData.totalPrice,
            orderStatus: 'Pending',
            paymentMethod: paymentMethod,
            shippingAddress: orderData.shippingAddress,
            paymentStatus: 'Pending'
        });

        await order.save();

        // Tạo các OrderItem với orderId
        const orderItems = await Promise.all(orderData.items.map(async item => {
            const orderItem = new OrderItem({
                productId: item.productId,
                name: item.name,
                price: item.price,
                size: item.size,
                quantity: item.quantity,
                imageUrl: item.imageUrl,
                orderId: order._id // Gán orderId cho mỗi OrderItem
            });
            await orderItem.save();
            return orderItem._id;
        }));

        // Cập nhật order với các OrderItem vừa tạo
        order.items = orderItems;
        await order.save();

        // Xử lý thanh toán nếu cần
        if (['PayPal', 'VNPay'].includes(paymentMethod)) {
            const payment = new Payment({
                orderId: order._id,
                userId: orderData.userId,
                paymentMethod: paymentMethod,
                amount: order.totalPrice,
                paymentStatus: 'Pending'
            });
            await payment.save();

            order.paymentId = payment._id;
            await order.save();
        }

        // Xóa giỏ hàng và các mục trong giỏ hàng sau khi tạo đơn hàng thành công

        return order;
    } catch (error) {
        console.error('Failed to create order:', error.message);
        throw new Error('Failed to create order');
    }
};

exports.completePayment = async (orderId, transactionId) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error('Order not found');
    }

    // Cập nhật trạng thái thanh toán
    order.paymentStatus = 'Completed';
    order.transactionId = transactionId;
    order.orderStatus = 'Processing';

    await order.save();

    // Cập nhật trạng thái payment nếu có
    if (order.paymentId) {
        const payment = await Payment.findById(order.paymentId);
        if (payment) {
            payment.paymentStatus = 'Completed';
            payment.transactionId = transactionId;
            await payment.save();
        }
    }

    return order;
};

exports.getUserOrders = async (userId) => {
    try {
      // Fetch orders and populate the items with their corresponding OrderItem data
      const orders = await Order.find({ userId })
        .populate({
          path: 'items',
          populate: {
            path: 'productId',
            select: 'name price size quantity imageUrl'  
          }
        })
        .exec();
  
      return orders;
    } catch (error) {
      console.error('Failed to fetch orders:', error.message);
      throw new Error('Failed to fetch orders');
    }
  };

  exports.findOrderById = async (orderId) => {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      return order;
    } catch (error) {
      throw new Error(error.message || 'Failed to find order');
    }
  };
  
  // Xóa đơn hàng theo ID
  exports.deleteOrderById = async (orderId) => {
    try {
      await Order.findByIdAndDelete(orderId);
      return { message: 'Order deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete order');
    }
  };


  exports.updateOrderStatus = async (orderId, orderStatus) => {
 
    try {
     const order = await Order.findById(orderId);
     if (!order) {
        throw new Error('Order not found');
      }
      order.orderStatus = orderStatus;
      await order.save();

      return  order;
    } catch (error) {
        throw new Error(error.message || 'Failed to update order');
    }
  };

  exports.getAllOrders = async () => {
    try {
  
      const orders = await Order.find()
        .populate('userId', 'name email')  
        .populate({
          path: 'items',  
          populate: {
            path: 'productId',  
            select: 'name price imageUrl'  
          }
        });
      
      return orders; // Trả về danh sách các đơn hàng
    } catch (error) {
      throw new Error('Failed to fetch orders');
    }
  };