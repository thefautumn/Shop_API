const paypalService = require('../services/paypalService'); // Import PayPal service

// Controller để tạo đơn hàng
const createOrder = async (req, res) => {
    const orderDetails = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '100.00' // Giá trị đơn hàng, thay đổi theo yêu cầu
            }
        }],
        application_context: {
            return_url: 'http://localhost:3000/return', // URL trả về sau khi thanh toán thành công
            cancel_url: 'http://localhost:3000/cancel'  // URL nếu người dùng hủy thanh toán
        }
    };

    try {
        const result = await paypalService.createOrder(orderDetails);
        res.json({
            id: result.id,
            status: result.status,
            links: result.links
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
};

// Controller để hoàn tất đơn hàng
const captureOrder = async (req, res) => {
    const { orderID } = req.body;

    try {
        const result = await paypalService.captureOrder(orderID);
        res.json({
            status: result.status,
            orderID: result.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
};

module.exports = {
    createOrder,
    captureOrder,
};
