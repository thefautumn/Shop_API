// routes/index.js
const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const authRoutes = require('./auth');
 
router.use('/api/users', userRoutes);   
router.use('/api/auth', authRoutes);    

module.exports = router;
