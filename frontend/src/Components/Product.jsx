import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Button from './Button';
import './Product.scss';

const Product = () => {

  const { productName } = useParams();
  const { state } = useLocation();
  const productNameFromState = state && state.productName;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const location = useLocation();
  const [registrationDate, setRegistrationDate] = useState(null); 

    const handleGoToProfile = () => {
    navigate('/profile', { state: { email, name } }); // Navigate to the profile page
  };

  useEffect(() => {
    const { state } = location;
    if (state && state.email) {
      setEmail(state.email);
    }
    if (state && state.name) {
      setName(state.name);
    }   if (state && state.registrationDate) { // Check if registrationDate exists in location state
      setRegistrationDate(state.registrationDate); // Set registrationDate state
    }
  }, [location]);

  const calculateWarrantyLeft = () => {
    if (!registrationDate) return 'Unknown';
  
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const currentDate = new Date(); // Current date in local time zone
    const expirationDate = new Date(registrationDate); // Convert the registration date to a Date object
    
    // Add 1 year to the registration date
    expirationDate.setFullYear(expirationDate.getFullYear() +1);
  
    // Set expiration date time to end of day in local time zone
    expirationDate.setHours(23, 59, 59, 999);
  
    // Calculate the time difference in milliseconds
    const timeDifference = expirationDate.getTime() - currentDate.getTime();
    
    // Calculate the number of days left until expiration
    const daysLeft = Math.floor(timeDifference / millisecondsInADay);
  
    if (daysLeft <= 0) {
      return 'Expired'; // If the warranty has expired
    } else {
      return `${daysLeft} days`; // Return the number of days left until expiration
    }
  };
  
  // Log registrationDate
  //console.log('Registration Date in product:', registrationDate);
  return (
    <div className="product">
      <h2>{productName || productNameFromState}</h2>

      {/* Example buttons */}
      {/* <section className='btn-section'>
        <Button label="Manual" className="custom-button" href="https://epi.dometic.com/externalassets/10-1016-101602-101602002_9600050795_86826.pdf?ref=1566983353&_gl=1*j2sdvg*_ga*MTE4MDcxMDc5NS4xNzAyNjI3Njky*_ga_D2ZX4PDC4Q*MTcxMDc4OTAxMy4yNy4xLjE3MTA3ODkzMzcuNTYuMC4w" />
        <Button label="Specification" className="custom-button" href="https://www.dometic.com/sv-se/outdoor/lp/dometic-go/portabel-vattenkran" />
        <Button label="Get Help" className="custom-button" href="https://www.dometic.com/sv-se/support" />
      </section> */}
      <section className='btn-section'>
  <a href="https://epi.dometic.com/externalassets/10-1016-101602-101602002_9600050795_86826.pdf?ref=1566983353&_gl=1*j2sdvg*_ga*MTE4MDcxMDc5NS4xNzAyNjI3Njky*_ga_D2ZX4PDC4Q*MTcxMDc4OTAxMy4yNy4xLjE3MTA3ODkzMzcuNTYuMC4w" target="_blank" rel="noopener noreferrer" >
    <Button label="Manual" />
  </a>
  <a href="https://www.dometic.com/sv-se/outdoor/lp/dometic-go/portabel-vattenkran" target="_blank" rel="noopener noreferrer" >
    <Button label="Specification" />
  </a>
  <a href="https://www.dometic.com/sv-se/support" target="_blank" rel="noopener noreferrer" >
    <Button label="Get Help" />
  </a>
</section>


      {/* Proof and warranty section */}
      <section className='proof'>
        {registrationDate && (
          <section className='registered-proof-section'>
            <p>Registered Date: {new Date(registrationDate).toLocaleDateString()}</p>
          </section>
        )}
        <section className='proof-of-purchase-section'>
          <p>Proof of Purchase: Receipt</p>
        </section>
        <section className='guarantee-left-section'>
          <p>Guarantee Left: {calculateWarrantyLeft()}</p>
        </section>
      </section>

      {/* Button to go to Profile */}
      <section className='profile-btn-section'>
        <Button label="Go to Profile" onClick={handleGoToProfile} />
      </section>
    </div>
  );
};

export default Product;
