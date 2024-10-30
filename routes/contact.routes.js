const Contact = require('../models/Contact.model');
const router = require('express').Router();

router.post('/contact', async (req, res) => {
  try {
    const createdContact = await Contact.create(req.body);
    res.status(201).json(createdContact); 
  } catch (err) {
    console.error("Error creating contact:", err);
    res.status(500).json({ error: "Failed to create contact", details: err }); 
  }
});

module.exports = router;
