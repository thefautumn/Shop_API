// routes/index.js
const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const authRoutes = require('./auth');
const productRoutes = require('./product');
const categoryRoutes = require('./category')

router.use('/api/users', userRoutes);   
router.use('/api/auth', authRoutes);    
router.use('/api/products', productRoutes);    
router.use('/api/categories',categoryRoutes)

module.exports = router;
