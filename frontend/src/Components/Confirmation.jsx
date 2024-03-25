import React, { useState, useEffect } from 'react';
import './Confirmation.scss';
import Button from "./Button";
import { useNavigate, useLocation } from "react-router-dom";

const Confirmation = ({productInfo}) => {
  const navigate = useNavigate();  
  const location = useLocation(); 
  const [email, setEmail] = useState(""); 
  const [name, setName] = useState(""); 
  const [registrationDate, setRegistrationDate] = useState(null); 


  useEffect(() => {
    // console.log('Product Info in Home:', productInfo);
  }, [productInfo]);

  useEffect(() => {
    const { state } = location;
    if (state && state.email) {
      setEmail(state.email);
     // console.log("Email received in Confirmation:", state.email);
    }
    if (state && state.name) {
      setName(state.name);
     //console.log("Name received in Confirmation:", state.name);
    }
    if (state && state.registrationDate) { // Check if registrationDate exists in location state
      setRegistrationDate(state.registrationDate); // Set registrationDate state
    }
  }, [location]);
  
  const handleProductClick = () => {
       //console.log("date sent to profile:", registrationDate);
    navigate("/product", { 
      state: { 
        productName: productInfo.name, 
        email: email,
        name: name,
        registrationDate
      } 
    });
  };
  
  const handleProfileClick = () => {
    //console.log("Email sent to profile:", email);
    //console.log("Name sent to profile:", name);
    navigate('/profile', { state: { email, name } }); // Pass email and name to profile
  };
  


  
  return (
    <div className="confirmation">
      <h2>{name ? `Hello ${name}!!` : "Hello Adventure!!"}! </h2>
      <p>Thank you for registering!!</p>
      {productInfo && (
        <div className='product-info '>
          <h6>{productInfo.name}</h6> 
          <div className="product-image">
            <img src={productInfo.img} alt="Product" />
          </div>
        </div>
      )}
      <div className="buttons">
        <Button label="Go to Product" onClick={handleProductClick} />
        <Button label="Go to Profile" onClick={handleProfileClick} />
      </div>
    </div>
  );
};

export default Confirmation;
