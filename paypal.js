const paypal = require('@paypal/checkout-server-sdk');

// Cấu hình môi trường Sandbox hoặc Live
const environment = new paypal.core.SandboxEnvironment(
    'AR63ST_zHbE684ZarDxhnuG-0yNSqA0YDiwBBVRiJBswVoztD37B-D09usAdP1IcMWjAphJO7Ra0Gygk', 
    'EF20FtOyxTyLZOy0ZrByVLwIlrOxxaC0STmF38WI3udNjYSagBNofLQcnwczcE2R7ezAlCZDTy2FcS7Y'
);
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = client;
