const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const Cart = require('../models/Cart.model');


router.post('/add', isAuthenticated, async (req, res) => {
  const { userId, serviceId, name, description } = req.body;

  try {
    
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    
    const serviceExists = cart.items.some(item => item.serviceId.toString() === serviceId);
    if (!serviceExists) {
      cart.items.push({ serviceId, name, description });
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
});


router.get('/cart', isAuthenticated, async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.serviceId',
      select: 'name description', 
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error });
  }
});

module.exports = router;
