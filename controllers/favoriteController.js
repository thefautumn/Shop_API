// src/controllers/favoriteController.js

const favoriteService = require('../services/favoriteService');

// Controller for adding a product to favorites
exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user from authentication middleware
    const { productId } = req.body;

    const favorite = await favoriteService.addFavorite(userId, productId);
    res.status(201).json(favorite);
  } catch (error) {
    console.error('Error adding favorite:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Controller for removing a product from favorites
exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user from authentication middleware
    const { productId } = req.params;

    const result = await favoriteService.removeFavorite(userId, productId);
    if (result) {
      res.status(200).json({ message: 'Favorite removed successfully.' });
    } else {
      res.status(404).json({ message: 'Favorite not found.' });
    }
  } catch (error) {
    console.error('Error removing favorite:', error.message);
    res.status(500).json({ message: 'Failed to remove favorite' });
  }
};

// Controller for fetching all favorites of a user
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user from authentication middleware

    const favorites = await favoriteService.getFavorites(userId);
    res.status(200).json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error.message);
    res.status(500).json({ message: 'Failed to fetch favorites' });
  }
};
