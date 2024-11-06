const { isAuthenticated } = require('../middleware/jwt.middleware');
const Cart = require('../models/Cart.model');
const router = require('express').Router();

router.post('/cart',isAuthenticated, async (req, res) => {
  try {
    const {name,description} = req.body
    const {_id} = req.payload
    const createdCart = await Cart.create({userId:_id,services:{name,description}});
    res.status(201).json(createdCart); 
  } catch (err) {
    console.error("Error creating contact:", err);
    res.status(500).json({ error: "Failed to create contact", details: err }); 
  }
});

router.get('/cart',isAuthenticated,async(req,res)=>{
  console.log(req.payload)
  const {_id} = req.payload

  try {
    const allCart = await Cart.findOne({userId:_id}); 
    console.log(allCart)
    res.json(allCart); 
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;