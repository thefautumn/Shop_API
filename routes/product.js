const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Tạo một sản phẩm mới
router.post('/', productController.createProduct);

// Lấy tất cả sản phẩm
router.get('/', productController.getProducts);

// Lấy một sản phẩm theo ID
router.get('/:id', productController.getProductById);

// Cập nhật sản phẩm theo ID
router.put('/:id', productController.updateProduct);

// Xóa sản phẩm theo ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
