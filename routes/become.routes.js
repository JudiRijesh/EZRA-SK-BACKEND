const Become = require('../models/Become.model');
const router = require('express').Router();

router.post('/become', async (req, res) => {
  try {
    const createdBecome = await Become.create(req.body);
    res.status(201).json(createdBecome); 
  } catch (err) {
    console.error("Error creating contact:", err);
    res.status(500).json({ error: "Failed to create contact", details: err }); 
  }
});

module.exports = router;
