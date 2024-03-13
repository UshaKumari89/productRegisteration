import React from 'react';
import './ProductRegistration.scss'; // Import your SCSS file for styling
import productImage from "../images/jugg.png"

const ProductRegistrationPage = () => {
  const productInfo = {
    "name":"Hydration Water Faucet",
    "model": "HYDWF",
    "sku": "9600050794",
    "pnc": "987654321",
    "serialNumber": "987456321",

  };

  return (
    <div className="product-registration">
      <section className='domatician'>
        <section className="register-your-product">
          <h1>Register your product and become a Dometican!</h1>
        </section>
        <section className="why">
          <h3>WHY?</h3>
          <p>
            Do as thousands of others and join a community that learns from each
            other
          </p>
        </section>
        <section className="benefits">
          <ul>
            <li>
              Get 500+ Dometicoins (~$10) that can be used for purchases,
              upgrades, or repairs
            </li>
            <li>Fast support</li>
            <li>Quick access to valuable information about your products</li>
            <li>
              Register within 2 weeks in order to try your product for 100 days to
              make sure you’re fully satisfied
            </li>
          </ul>
        </section>
      </section>

      <section className="product-info-container">
   
          {/* Add image of the product on the left side */}
          <div className="product-image">
            {/* Include your product image here */}
            <img src={productImage} alt="Product" />
          </div>

          {/* Display product information on the right side */}
        
            <section className='product-detail'>
            
            <h3>{productInfo.name}</h3> 

            <p>
              <strong>Model:</strong> <small>{productInfo.model}</small>
            </p>
            <p>
              <strong>SKU:</strong> <small>{productInfo.sku}</small>
            </p>
            <p>
              <strong>PNC:</strong> <small>{productInfo.pnc}</small>
            </p>
            <p>
              <strong>Serial Number:</strong> <small>{productInfo.serialNumber}</small>
            </p>
            </section>
        
     
      </section>
    </div>
  );
};

export default ProductRegistrationPage;


// const sendDataToServer = async () => {
//   const productInfo = {
//     name: 'Hydration Water Faucet',
//     model: 'HYDWF',
//     sku: '9600050794',
//     pnc: '987654321',
//     serialNumber: '987456321',
//   };

//   try {
//     const response = await fetch('/api/products', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(productInfo),
//     });

//     const data = await response.json();
//     console.log(data); // Log the response from the server
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// sendDataToServer();
