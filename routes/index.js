// routes/index.js
const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const authRoutes = require('./auth');
const productRoutes = require('./product');

router.use('/api/users', userRoutes);   
router.use('/api/auth', authRoutes);    
router.use('/api/products', productRoutes);    


module.exports = router;
