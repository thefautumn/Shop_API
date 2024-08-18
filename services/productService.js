
const Product = require('../models/Product');
const Category = require('../models/Category');
exports.createProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

exports.getProducts = async () => {
  return await Product.find();
};

exports.getProductWithCategoryDetails = async (productId) => {
  try {
    // Tìm sản phẩm và populate danh mục của nó
    const product = await Product.findById(productId).populate('category');

    if (!product) {
      throw new Error('Product not found');
    }

    let currentCategory = await Category.findById(product.category._id);
    const categories = [];

    // Thêm danh mục hiện tại vào mảng
    categories.push(currentCategory);

    // Lấy tất cả danh mục cha
    while (currentCategory && currentCategory.parentCategoryId) {
      currentCategory = await Category.findById(currentCategory.parentCategoryId);
      if (currentCategory) {
        categories.unshift(currentCategory); // Thêm danh mục cha vào đầu mảng
      }
    }

    return {
      product,
      categories,
    };
  } catch (error) {
    console.error('Error fetching product with category details:', error);
    throw error;
  }
};

exports.updateProduct = async (id, updateData) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

exports.deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
