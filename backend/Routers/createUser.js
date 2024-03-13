const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "mySecretKey123";

// Validation middleware for user creation
const validateUserInfo = [
  body('password', 'Incorrect Password').isLength({ min: 5 }),
  body('name', 'Invalid Name').isLength({ min: 4 }),
  body('email', 'Invalid Email').isEmail()
];

// Route to create a new user
router.post('/createuser', validateUserInfo, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await User.create({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      surname: req.body.surname // Assuming you have a "surname" field
    });

    console.log("User created successfully:", req.body.email); // Log the email of the newly created user
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

// Route for user login
router.post('/login', validateLoginInfo, async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      console.log("User not found for login:", email); // Log when user is not found for login attempt
      return res.status(401).json({ success: false, message: 'Invalid email' });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: existingUser._id }, jwtSecret);
      console.log("User logged in successfully:", email); // Log successful login attempt
      return res.status(200).json({ success: true, message: 'Login successful', token });
    } else {
      console.log("Incorrect password for login:", email); // Log when password is incorrect for login attempt
      return res.status(401).json({ success: false, message: 'Password is incorrect' });
    }
  } catch (error) {
    console.error("Error during login:", error); // Log any errors that occur during login
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Route to check if email exists in the database
// router.post('/checkEmail', async (req, res) => {
//   try {
//     const { email } = req.body;
//     console.log("Request received to check email:", email); // Log the email being checked
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       console.log("User exists. Redirecting to login page:", email); // Log when user exists for email check
//       return res.status(200).json({ redirect: '/login' });
//     } else {
//       console.log("User does not exist. Redirecting to signup page:", email); // Log when user does not exist for email check
//       return res.status(200).json({ redirect: '/signup' });
//     }
//   } catch (error) {
//     console.error("Error checking email:", error); // Log any errors that occur during email check
//     res.status(500).json({ success: false, message: 'Server Error' });
//   }
// });
router.post('/checkEmail', async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Request received to check email:", email); // Log the email being checked
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

module.exports = router;