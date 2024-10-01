const categoryService = require('../services/categoryService');
const Category =  require('../models/Category');

// GET: Lấy tất cả categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET: Lấy một category theo id
exports.getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: Tạo một category mới
exports.createCategory = async (req, res) => {
  try {
    const newCategory = await categoryService.createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH: Cập nhật một category theo id
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE: Xóa một category theo id
exports.deleteCategory = async (req, res) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getSubcategories = async (req, res) => {
  const parentId = req.params.parentId;
  try {
    const subcategories = await categoryService.getSubcategoriesByParentId(parentId);
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getCategoryByName = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category by name:', error);
    res.status(500).json({ error: 'Failed to fetch category by name' });
  }
};


 