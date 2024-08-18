// controllers/productController.js

const productService = require('../services/productService');
const Category = require('../models/Category');
exports.createProduct = async (req, res) => {
  try {
    const savedProduct = await productService.createProduct(req.body);
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productWithCategories = await productService.getProductWithCategoryDetails(req.params.id);

    if (!productWithCategories.product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(productWithCategories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product with category details', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};
