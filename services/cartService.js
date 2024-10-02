const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

exports.addToCart = async (userId, productId, quantity, size) => {
  if (!userId || !productId || !quantity || !size) {
    throw new Error('User ID, Product ID, quantity, and size are required.');
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found.');
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
      await cart.save();  // Save the cart to get the cartId
    }

    // Check if the item is already in the cart
    let cartItem = await CartItem.findOne({ productId, size, _id: { $in: cart.items } });

    if (cartItem) {
      // If the item exists, update its quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Create a new cart item
      cartItem = new CartItem({
        productId,
        name: product.name,
        price: product.price,
        size,
        quantity,
        imageUrl: product.imageUrl[0],
        cartId: cart._id  // Associate the CartItem with the cartId
      });

      await cartItem.save();
      cart.items.push(cartItem._id);  // Push the ObjectId of the cartItem into the cart's items array
    }

    // Update the total price of the cart
    cart.totalPrice += product.price * quantity;

    // Save the cart with the updated items and total price
    await cart.save();

    return cart;
  } catch (error) {
    console.error('Error in addToCart service:', error.message);
    throw new Error('Failed to add item to cart.');
  }
};

exports.getCartByUserId = async (userId) => {
    if (!userId) {
      throw new Error('User ID is required');
    }
  
    const cart = await Cart.findOne({ userId }).populate('items');
    
    if (!cart) {
      throw new Error('Cart not found');
    }
    if (cart.items.length === 0) {
      return { message: 'Cart is empty', items: [] };
    }
  
    return cart;
  };

  exports.updateCartItemQuantity = async (userId, productId, size, quantity) => {
    if (!userId || !productId || !size || !quantity) {
        throw new Error('User ID, Product ID, size, and quantity are required.');
    }

    const cart = await Cart.findOne({ userId }).populate('items');
    if (!cart) {
        throw new Error('Cart not found.');
    }

    const cartItem = cart.items.find(item => item.productId.toString() === productId && item.size === size);
 
    if (!cartItem) {
        throw new Error('Item not found in cart.');
    }

    cartItem.quantity = quantity;
    
    console.log('Cart items:' + cartItem);

    await cartItem.save();
    await cart.save();
    return cart;
};
exports.removeCartItem = async (userId, productId, size) => {
  if (!userId || !productId || !size) {
      throw new Error('User ID, Product ID, and size are required.');
  }

  const cart = await Cart.findOne({ userId }).populate('items');
  if (!cart) {
      throw new Error('Cart not found.');
  }

  const cartItemIndex = cart.items.findIndex(item => item.productId.toString() === productId && item.size === size);
  if (cartItemIndex === -1) {
      throw new Error('Item not found in cart.');
  }
  const cartItemId = cart.items[cartItemIndex]._id;


  cart.items.splice(cartItemIndex, 1);

  await cart.save();
  await CartItem.findByIdAndDelete(cartItemId);

  return cart;
};

exports.getCartWithUserDetails = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId })
      .populate({
        path: 'items',
        populate: {
          path: 'productId',
          select: 'name price imageUrl'  
        }
      })
      .populate({
        path: 'userId',
        select: 'firstName lastName phone province district ward detailedAddress email' 
      })
      .exec();

    if (!cart) {
      throw new Error('Cart not found');
    }

    return cart;
  } catch (error) {
    throw new Error(`Failed to get cart: ${error.message}`);
  }
};

exports.clearCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    return cart;
  } catch (error) {
    console.error('Failed to clear cart:', error);
  }
};
