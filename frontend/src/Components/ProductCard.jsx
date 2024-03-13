import React from 'react';
import jug from '../images/jug.png'
import './ProductCard.scss'; 



function ProductCard() {
  
    const handleClick = () => {
      console.log("Button clicked!");
     window.open("https://www.dometic.com/en-gb/outdoor/car-camping/hydration/dometic-go-hydration-water-jug-11l-331232?v=9600050825")
    };
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={jug} alt="Product" />
      </div>
      <div className="product-details">
        <h3 className="product-title"> Hydration Water Faucet</h3>
        <section className='product-info '>

        <p className="product-info"> Hydration Water Jug 11L</p>
        <p className="product-info"> 899kr</p>
        <p className="product-info"><span className="dot white"></span> <span className="dot black"></span></p>
        </section>
        <button className="shop-now-btn" onClick={handleClick}>Shop Now</button>
      </div>
    </div>
  );
}

export default ProductCard;
