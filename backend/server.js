const express = require('express');
const app = express();
const cors = require('cors');

const productRouter = require('./Routers/createProduct');
// Parse JSON request bodies
app.use(express.json());

// Add your CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Other CORS headers if needed
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Allow cookies to be sent from the client
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

// Import the function for MongoDB connection from database.js
const { mongoDbConnection } = require('./database');

// Call the mongoDbConnection function to establish the connection
mongoDbConnection();

// Define your routes and middleware
app.use('/api', require('./Routers/createUser'));
app.use('/api/products', productRouter);

// Start the Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
