
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Home from './Components/Home';
import NavBar from './Components/Navbar';
import UserRegister from './Components/UserRegister';
import SignUp from "./Components/SignIn";
import Login from './Components/Login.jsx'; 
import Confirmation from  './Components/Confirmation';
import Profile from "./Components/Profile"
import Product from "./Components/Product"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [productInfo, setProductInfo] = useState(null);



  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        const data = response.data;
        if (data.success && data.products.length > 0) {
          setProductInfo(data.products[0]);
        } else {
          console.error('Failed to fetch product information:', data.error);
        }
      } catch (error) {
        console.error('Error fetching product information:', error);
      }
    };

    fetchProductInfo();
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Pass productInfo to each route */}
        <Route path="/" element={<Home productInfo={productInfo} />} />
        <Route path="/UserRegister" element={<UserRegister productInfo={productInfo} />} />
        <Route path="/SignUp" element={<SignUp productInfo={productInfo} />} />
        <Route path="/Login" element={<Login productInfo={productInfo} />} /> 
        <Route path="/Confirmation" element={<Confirmation productInfo={productInfo} />} /> 
        <Route path="/product" element={<Product productInfo={productInfo} />} />
        <Route path="/Profile" element={<Profile productInfo={productInfo} />} /> 
      </Routes>
    </Router>
  );
}

export default App;
