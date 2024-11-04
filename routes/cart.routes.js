const Cart = require('../models/Cart.model');
const router = require('express').Router();

router.post('/cart', async (req, res) => {
  try {
    const createdCart = await Cart.create(req.body);
    res.status(201).json(createdCart); 
  } catch (err) {
    console.error("Error creating contact:", err);
    res.status(500).json({ error: "Failed to create contact", details: err }); 
  }
});

router.get('/cart',async(req,res)=>{

  try {
    const allCart = await Cart.find().populate('items'); 
    res.json(allCart); 
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;