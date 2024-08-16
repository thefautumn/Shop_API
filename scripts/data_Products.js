const mongoose = require('mongoose');
const Product = require('../models/Product'); 
const Cate = require('../models/Category'); 

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_website', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log('Connected to MongoDB');
    generateData();
}).catch(err => {
    console.error('Could not connect to MongoDB', err);
});
async function generateData() {
    try {
        // Lấy danh mục "Áo" cho Nam
        const maleShirtCategory = await Cate.findOne({ name: 'Áo', parentCategoryId:'66bba5bf9efee72fbc0e019b' });

        if (!maleShirtCategory) {
            console.error('Category "Áo" not found. Please create this category first.');
            return;
        }

        // Sample products data
        const products = [
            {
                name: 'DRY-EX Crew Neck T-Shirt',
                price: 120,
                description: 'wonderful clothe',
                category: maleShirtCategory._id,  // Trỏ đúng vào danh mục "Áo"
                gender: 'Nam',
                imageUrl: 
                [
                    'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/465191/item/vngoods_56_465191.jpg?width=750',
                    'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/465191/sub/vngoods_465191_sub7.jpg?width=750',
                    'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465191/sub/goods_465191_sub14.jpg?width=60',
                    'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465191/sub/goods_465191_sub17.jpg?width=750',
                    'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465191/sub/goods_465191_sub18.jpg?width=750'

                ],

                stocks: [
                    { size: 'S', quantity: 11 },
                    { size: 'M', quantity: 12 },
                    { size: 'X', quantity: 14 },
                    { size: 'XL', quantity: 15 }
                ],
                reviews: [
                    { userId: '66bcdf24c9ebcf2420fcc33c', rating: 4, comment: 'Great clothe!' },
                ]
            }
        ];

        // Insert sample products into the database
        await Product.insertMany(products);
        console.log('Sample products inserted into the database');
    } catch (err) {
        console.error('Error inserting products:', err);
    } finally {
        mongoose.disconnect();
    }
}
