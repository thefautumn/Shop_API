// src/routes/favoriteRoutes.js

const express = require('express');
const favoriteController = require('../controllers/favoriteController');
const authenticateToken = require('../middlewares/authenticateToken'); // Middleware to authenticate user

const router = express.Router();

// Route to add a product to favorites
router.post('/', authenticateToken, favoriteController.addFavorite);

// Route to remove a product from favorites
router.delete('/:productId', authenticateToken, favoriteController.removeFavorite);

// Route to get all favorites for a user
router.get('/', authenticateToken, favoriteController.getFavorites);

module.exports = router;
