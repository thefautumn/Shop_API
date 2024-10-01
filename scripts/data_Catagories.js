const mongoose = require('mongoose');
const Category = require('../models/Category'); // Adjust the path to your Category model file

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');

  // Create Accessories root category
  const accessoriesCategory = new Category({
    name: 'Accessories',
    description: 'All accessories items',
  });

  accessoriesCategory.save().then(() => {
    // Create subcategories under Accessories
    const bagsCategory = new Category({
      name: 'Bags',
      parentCategoryId: accessoriesCategory._id,
      description: 'Various styles of bags',
    });

    const hatsCategory = new Category({
      name: 'Hats',
      parentCategoryId: accessoriesCategory._id,
      description: 'Different types of hats',
    });

    const jewelryCategory = new Category({
      name: 'Jewelry',
      parentCategoryId: accessoriesCategory._id,
      description: 'Earrings, necklaces, and more',
    });

    const beltsCategory = new Category({
      name: 'Belts',
      parentCategoryId: accessoriesCategory._id,
      description: 'Belts for all outfits',
    });

    const scarvesCategory = new Category({
      name: 'Scarves',
      parentCategoryId: accessoriesCategory._id,
      description: 'Various scarves for different seasons',
    });

    return Promise.all([
      bagsCategory.save(),
      hatsCategory.save(),
      jewelryCategory.save(),
      beltsCategory.save(),
      scarvesCategory.save()
    ]);
  }).then(() => {
    console.log('Accessories and subcategories saved successfully');
    mongoose.connection.close();
  }).catch(err => {
    console.error('Error saving categories:', err);
    mongoose.connection.close();
  });
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
