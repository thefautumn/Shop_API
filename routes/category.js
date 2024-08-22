const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Định nghĩa các routes và liên kết với controller
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.patch('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);
router.get('/subcategories/:parentId', categoryController.getSubcategories);

module.exports = router;
