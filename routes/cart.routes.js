const { isAuthenticated } = require('../middleware/jwt.middleware');
const Cart = require('../models/Cart.model');
const router = require('express').Router();

router.post('/cart', isAuthenticated, async (req, res) => {
  try {
    const { name, description } = req.body
    const { _id } = req.payload

   //Finding if the user has a cart
    let cart = await Cart.findOne({ userId: _id })

    // If the user doesn't have cart, create one
    if (!cart) {
      cart = await Cart.create({
        userId: _id,
        services: [{ name, description }],
      })
      return res.status(201).json(cart)
    }

    // If cart exists, push new service to it
    cart.services.push({ name, description })
    await cart.save()

    res.status(200).json(cart) 
  } catch (err) {
    console.error("Error adding service to cart:", err)
    res.status(500).json({ error: "Failed to add service to cart", details: err })
  }
})

router.get('/cart', isAuthenticated, async (req, res) => {
  const { _id } = req.payload

  try {
    const allCart = await Cart.findOne({ userId: _id })

    res.json(allCart)
  } catch (err) {
    console.error("Error fetching cart:", err)
    res.status(500).json({ error: "Failed to fetch cart", details: err })
  }
})

module.exports = router;
