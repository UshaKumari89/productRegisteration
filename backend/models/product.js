const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  model: String,
  sku: String,
  pnc: String,
  serialNumber: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
