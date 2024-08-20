const paypalClient = require('../paypal'); // Import PayPal client
const paypal = require('@paypal/checkout-server-sdk');

// Tạo đơn hàng
const createOrder = async (orderDetails) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody(orderDetails);

    try {
        const response = await paypalClient.execute(request);
        return response.result;
    } catch (error) {
        throw new Error('Failed to create order: ' + error.message);
    }
};

// Hoàn tất đơn hàng
const captureOrder = async (orderID) => {
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
        const capture = await paypalClient.execute(request);
        return capture.result;
    } catch (error) {
        throw new Error('Failed to capture order: ' + error.message);
    }
};

module.exports = {
    createOrder,
    captureOrder,
};
