

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  pnc: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  background: String,

  backgroundImage: String,

  howToUse: String,
  accessory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
