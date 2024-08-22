// paypalConfig.js
const axios = require('axios');

const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Đổi thành 'https://api-m.paypal.com' cho môi trường live
const CLIENT_ID = 'AR63ST_zHbE684ZarDxhnuG-0yNSqA0YDiwBBVRiJBswVoztD37B-D09usAdP1IcMWjAphJO7Ra0Gygk';
const CLIENT_SECRET = 'EF20FtOyxTyLZOy0ZrByVLwIlrOxxaC0STmF38WI3udNjYSagBNofLQcnwczcE2R7ezAlCZDTy2FcS7Y';

async function generateAccessToken() {
    const response = await axios({
        url: `${PAYPAL_API}/v1/oauth2/token`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            username: CLIENT_ID,
            password: CLIENT_SECRET,
        },
        data: 'grant_type=client_credentials',
    });

    return response.data.access_token;
}

module.exports = { generateAccessToken, PAYPAL_API };
