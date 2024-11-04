const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const express = require('express');
const router = express.Router(); 


router.post('/add', async (req, res) => {
  const { userId, name, serviceId } = req.body;

  try {
    
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    
    let cartItem = await CartItem.findOne({ cartId: cart._id, serviceId });
    if (cartItem) {
     
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      
      cartItem = new CartItem({ cartId: cart._id, name, serviceId, quantity: 1 });
      await cartItem.save();

      
      cart.items.push(cartItem._id);
      await cart.save();
    }

    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
});


router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    
    const cart = await Cart.findOne({ userId }).populate('items');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart', error });
  }
});

module.exports = router;
