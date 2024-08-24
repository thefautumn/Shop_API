// src/services/favoriteService.js

const Favorite = require('../models/Favorite');

// Add a product to favorites
exports.addFavorite = async (userId, productId) => {
  try {
    // Check if the product is already a favorite
    const existingFavorite = await Favorite.findOne({ userId, productId });
    if (existingFavorite) {
      throw new Error('Product is already in favorites');
    }

    const favorite = new Favorite({
      userId,
      productId
    });

    await favorite.save();
    return favorite;
  } catch (error) {
    throw new Error('Failed to add favorite: ' + error.message);
  }
};

// Remove a product from favorites
exports.removeFavorite = async (userId, productId) => {
  try {
    const result = await Favorite.findOneAndDelete({ userId, productId });
    return result;
  } catch (error) {
    throw new Error('Failed to remove favorite: ' + error.message);
  }
};

// Get all favorites for a user
exports.getFavorites = async (userId) => {
  try {
    const favorites = await Favorite.find({ userId })
    .populate('productId');
    return favorites;
  } catch (error) {
    throw new Error('Failed to fetch favorites: ' + error.message);
  }
};
