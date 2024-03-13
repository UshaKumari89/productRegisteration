import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./Home.scss";
import ImageBox from "./ImageBox";
import bgPic from "../images/waterJug.jpeg";
import ProductCard from "./ProductCard";
import Video from "./Video";
import DownloadSection from "./DownloadSection";
import ProductRegistrationPage from "./ProductRegisteration";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    //console.log("Button clicked!");
    navigate("/UserRegister");
  };

  return (
    <div className="home-container">
 
      <ProductRegistrationPage/>

      <Button
        label="Product Register / LogIn"
        onClick={handleClick}
        className="butn"
      />

      <section className="getInspired">
        <h2>Get Inspired</h2>
        <ImageBox
          backgroundImage={bgPic}
          heading="RUNNING WATER ON THE GO"
          text="The only off-grid water solution you’ll ever need"
          link="https://www.dometic.com/sv-se/outdoor/lp/dometic-go/portabel-vattenkran"
        />
      </section>
      <Video
        heading="How to use that"
        videoUrl="https://www.youtube.com/embed/KR5dfovNP-s"
        videotitle="DOMETIC | Dometic GO Hydration Water Jug 11L"
      />
      <Video
        heading="Expand your experiance"
        videoUrl="https://www.youtube.com/embed/IfU6i0osJWg"
        videotitle="DOMETIC | GO HYD-J11 Hydration Water Jug with Water Tap"
      />

      <ProductCard />

      <DownloadSection />
    </div>
  );
}

export default Home;
