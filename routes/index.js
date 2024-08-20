// routes/index.js
const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const authRoutes = require('./auth');
const productRoutes = require('./product');
const categoryRoutes = require('./category')
const cartRoutes = require('./cart')
const paypalRoutes = require('./paypal')


router.use('/api/users', userRoutes);   
router.use('/api/auth', authRoutes);    
router.use('/api/products', productRoutes);    
router.use('/api/categories',categoryRoutes);
router.use('/api/cart',cartRoutes);
router.use('/paypal',cartRoutes);

module.exports = router;
