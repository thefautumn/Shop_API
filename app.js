const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const routes = require('./routes');
const connectDB = require('./config/db');
dotenv.config();

const app = express();

// Middleware để phân tích body của request
app.use(express.json());

// Kết nối đến MongoDB
connectDB();

// Sử dụng routes
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
