const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "mySecretKey123";
const Product = require('../models/product')

// Validation middleware for user creation
const validateUserInfo = [
  body('password', 'Incorrect Password').isLength({ min: 5 }),
  body('name', 'Invalid Name').isLength({ min: 2 }),
  body('email', 'Invalid Email').isEmail()
];

router.post('/createuser', validateUserInfo, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create the user and include registration date
    const newUser = await User.create({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      surname: req.body.surname, // Assuming you have a "surname" field
      registrationDate: Date.now(), // Include the registration date
    });

   // console.log("User created successfully:", req.body.email); // Log the email of the newly created user

    // Log user after saving
    //console.log("User after saving:", newUser);

    // Check if product registration information is provided
    if (req.body.product) {
      const productName = req.body.product;

      // Find the product in the database
      const product = await Product.findOne({ name: productName });

      if (!product) {
        console.error("Product not found:", productName);
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      // Associate the product with the user
      newUser.registeredProduct = product._id;
      newUser.registeredProductName = productName;
      await newUser.save();

      //console.log("Product associated with user successfully:", productName); // Log the name of the product associated with the user
    }

    // Log registered product separately
    //console.log("Registered Product ID:", newUser.registeredProduct);

    res.json({ success: true });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});


// Validation middleware for user login
const validateLoginInfo = [
  body('password', 'Incorrect Password').isLength({ min: 5 }),
  body('email', 'Invalid Email').isEmail()
];


router.post('/login', validateLoginInfo, async (req, res) => {
  const { email, password, productInfo} = req.body;

  //console.log('Request body:', req.body); // Log the request body to see what data is being sent

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existingUser = await User.findOne({ email });

    //console.log('Existing user:', existingUser); 

    if (!existingUser) {
      console.log("User not found for login:", email);
      return res.status(401).json({ success: false, message: 'Invalid email' });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: existingUser._id }, jwtSecret);
      //console.log("User logged in successfully:", email);

      if (!existingUser.registeredProduct || !existingUser.registrationDate) {
   
        existingUser.registeredProduct = productInfo._id; // Access product ID directly
        existingUser.registeredProductName = productInfo.name; 
        existingUser.registrationDate = Date.now();
        await existingUser.save();
      } else {
        //console.log("Product and date already registered.");
      }

      return res.status(200).json({ success: true, message: 'Login successful', email: existingUser.email, name: existingUser.name,  registrationDate: existingUser.registrationDate,  token });
    } else {
      console.log("Incorrect password for login:", email);
      return res.status(401).json({ success: false, message: 'Password is incorrect' });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});



router.post('/checkEmail', async (req, res) => {
  try {
    const { email } = req.body;
    //console.log("Request received to check email:", email); // Log the email being checked
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User exists. Redirecting to login page:", email); // Log when user exists for email check
      return res.status(200).json({ exists: true });
    } else {
      console.log("User does not exist. Redirecting to signup page:", email); // Log when user does not exist for email check
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking email:", error); // Log any errors that occur during email check
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

router.delete('/users/:email', async (req, res) => {
  const email = req.params.email;

  try {
    // Find the user by email and delete it from the database
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    console.log('User deleted successfully:', deletedUser.email);
    return res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});






module.exports = router;

