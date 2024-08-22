// src/services/paypalService.js
const axios = require('axios');
const { generateAccessToken, PAYPAL_API } = require('../paypalConfig');

async function createPaypalOrder(amount) {
    const accessToken = await generateAccessToken();

    const orderResponse = await axios({
        url: `${PAYPAL_API}/v2/checkout/orders`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        data: {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: amount.toString(),
                },
            }],
            application_context: {
                return_url: 'http://localhost:3000/success',
                cancel_url: 'http://localhost:3000/cancel',
            },
        },
    });

    return orderResponse.data;
}

async function capturePaypalPayment(orderId) {
    const accessToken = await generateAccessToken();

    const captureResponse = await axios({
        url: `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    return captureResponse.data;
}

module.exports = {
    createPaypalOrder,
    capturePaypalPayment,
};
