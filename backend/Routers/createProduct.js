const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Route to create a new product
router.post('/', async (req, res) => {
  try {
    const { name, model, sku, pnc, serialNumber } = req.body;
    const product = new Product({ name, model, sku, pnc, serialNumber });
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
