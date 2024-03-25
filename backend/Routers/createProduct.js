const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Function to insert products directly if they don't exist
const insertProductsIfNotExist = async (productsToInsert) => {
  try {
    //console.log("Checking if products already exist...");
    const existingProducts = await Product.find();
    if (existingProducts.length === 0) {
      console.log("No products found, inserting products...");
      const insertedProducts = await Product.insertMany(productsToInsert);
      //console.log('Products inserted successfully:', insertedProducts);
    } else {
      //console.log("Products already exist, skipping insertion...");
    }
  } catch (error) {
    console.error('Error checking or inserting products:', error);
  }
};


const productsToInsert = [
  {
    "name": "Hydration Water Faucet",
    "model": "HYDWF",
    "sku": "9600050794",
    "pnc": "987654321",
    "serialNumber": "987456321",
    "img": "https://epi.dometic.com/externalassets/10-1016-101602-101602002_9600050795_93866.png?ref=-891074631&w=1280&scale=both&format=jpg",
    "id": "HYDWF-987456321",
    "background": "https://www.dometic.com/sv-se/outdoor/lp/dometic-go/portabel-vattenkran",
    "howToUse": "https://youtu.be/KR5dfovNP-s",
    "backgroundImage": "https://epi.dometic.com/globalassets/qbank/sar_01091_01_expanded-9724080af2a970a9f318c4a6543f0f77a33bb.png?ref=19F15AA0BB&w=2880&scale=both&format=jpg"
  },
  
]

// Call the insertProductsIfNotExist function
insertProductsIfNotExist(productsToInsert);

// Route to create a new product
router.post('/', async (req, res) => {
  try {
    const { name, model, sku, pnc, serialNumber, img } = req.body;
    const product = new Product({ name, model, sku, pnc, serialNumber, img });
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to insert multiple products
router.post('/insert-multiple', async (req, res) => {
  try {
    const productsToInsert = req.body.products; 
    const insertedProducts = await Product.insertMany(productsToInsert);
    res.status(201).json({ success: true, insertedProducts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
