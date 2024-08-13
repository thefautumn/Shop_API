// routes/auth.js
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', 
  [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required')
  ], 
  authController.login
);

router.post('/register', 
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  ], 
  authController.register
);

router.post('/recover', authController.recover);

router.post('/reset', authController.resetPassword);

module.exports = router;
