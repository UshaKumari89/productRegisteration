import React from 'react';
import './Imagebox.scss'; 

const ImageBox = ({ backgroundImage, text, heading, link }) => {
  const boxStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <a href={link} className="image-box-link">
    <div className="image-box" style={boxStyle}>
        <section className="text-overlay ">
         <h3 className="image-box-heading">{heading}</h3>
        <p className="image-box-text">{text}</p>
       
        </section>
    </div>
    </a>
  );
};

export default ImageBox;