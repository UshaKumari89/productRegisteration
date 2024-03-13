import React from 'react';
import './DownloadSection.scss'; // Import your SCSS file for styling
import Button from "./Button";



function DownloadSection() {

  const handleClick = () => {
    console.log("Button clicked!");
    window.open("https://www.dometic.com/en-gb/support--service/apps", "_blank");

  };

  return (
    <div className="container">
    <center>
      <h2 className="h3 py-4">Join the community,
          Download the app!</h2>
      {/* App Store button */}
      <Button
        label="Download Apps"
        onClick={handleClick}
        className="butn"
      />
      
    </center>
  </div>
  );
}

export default DownloadSection;
