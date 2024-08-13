const mongoose = require('mongoose');
const Category = require('../models/Category'); // Đường dẫn đến file Category.js

// Kết nối đến MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  
  const maleCategory = new Category({
    name: 'Nam',
    description: 'Danh mục thời trang cho Nam'
  });

  const femaleCategory = new Category({
    name: 'Nữ',
    description: 'Danh mục thời trang cho Nữ'
  });

  maleCategory.save().then(() => {
    const maleClothingCategory = new Category({
      name: 'Quần áo Nam',
      parentCategoryId: maleCategory._id,
      description: 'Danh mục quần áo cho Nam'
    });

    maleClothingCategory.save().then(() => {
      const malePantsCategory = new Category({
        name: 'Quần',
        parentCategoryId: maleClothingCategory._id,
        description: 'Quần cho Nam'
      });

      const maleShirtsCategory = new Category({
        name: 'Áo',
        parentCategoryId: maleClothingCategory._id,
        description: 'Áo cho Nam'
      });

      const maleJeansCategory = new Category({
        name: 'Quần Jean',
        parentCategoryId: maleClothingCategory._id,
        description: 'Quần Jean cho Nam'
      });

      const maleShirtCategory = new Category({
        name: 'Áo Sơ Mi',
        parentCategoryId: maleClothingCategory._id,
        description: 'Áo Sơ Mi cho Nam'
      });

      return Promise.all([
        malePantsCategory.save(),
        maleShirtsCategory.save(),
        maleJeansCategory.save(),
        maleShirtCategory.save()
      ]);
    }).then(() => {
      console.log('Categories saved successfully');
      mongoose.connection.close();
    }).catch(err => {
      console.error('Error saving categories:', err);
      mongoose.connection.close();
    });
  });
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
