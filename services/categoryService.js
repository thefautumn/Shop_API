const Category = require('../models/Category');

// Lấy tất cả categories
exports.getAllCategories = async () => {
  return await Category.find().populate('parentCategoryId').exec();
};

// Lấy một category theo id
exports.getCategoryById = async (id) => {
  return await Category.findById(id).populate('parentCategoryId').exec();
};

// Tạo một category mới
exports.createCategory = async (data) => {
  const category = new Category({
    name: data.name,
    description: data.description,
    parentCategoryId: data.parentCategoryId || null
  });
  return await category.save();
};

// Cập nhật một category
exports.updateCategory = async (id, data) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error('Category not found');
  }

  if (data.name) category.name = data.name;
  if (data.description) category.description = data.description;
  if (data.parentCategoryId) category.parentCategoryId = data.parentCategoryId;

  return await category.save();
};

// Xóa một category
exports.deleteCategory = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error('Category not found');
  }

  return await category.remove();
};

exports.getSubcategoriesByParentId = async (parentId) => {
  try {
    const subcategories = await Category.find({ parentCategoryId: parentId });
    return subcategories;
  } catch (error) {
    throw new Error('Failed to fetch subcategories');
  }
};
