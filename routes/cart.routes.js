const { isAuthenticated } = require('../middleware/jwt.middleware');
const Cart = require('../models/Cart.model');
const router = require('express').Router();

//Adding the services to cart
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


//Display services in cart
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



// Delete a service from the cart
router.delete('/cart/:serviceId', isAuthenticated, async (req, res) => {
  const { _id } = req.payload
  const { serviceId } = req.params

  try {
    
    const cart = await Cart.findOne({ userId: _id })
    
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    // Remove the service from the cart based on service name
    const initialServiceCount = cart.services.length
    cart.services = cart.services.filter(service => service._id.toString() !== serviceId)

    // Check if a service was removed
    if (cart.services.length === initialServiceCount) {
      return res.status(404).json({ error: "Service not found in cart" })
    }

    // Save the updated cart
    await cart.save()

    res.status(200).json({ message: "Service deleted successfully", cart })
  } catch (err) {
    console.error("Error deleting service from cart:", err)
    res.status(500).json({ error: "Failed to delete service from cart", details: err })
  }
})


module.exports = router;
