const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  }, 
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  // Field for product name (optional)
  registeredProductName: String, 
  
  // Field for storing the ObjectId of the associated product
  registeredProduct: {
    type: Schema.Types.ObjectId,
    ref: 'Product' // Reference to the Product model
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
