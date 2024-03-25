
// Home.jsx
import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import './Home.scss';
import ImageBox from './ImageBox';
import ProductCard from './ProductCard';
import Video from './Video';
import DownloadSection from './DownloadSection';
import ProductRegistrationPage from './ProductRegisteration'; // Correct import statement




function Home({ productInfo }) {

  const navigate = useNavigate();

const handleButtonClick = async () => {
    navigate('/UserRegister');
};

 useEffect(() => {
   // console.log('Product Info in Home:', productInfo);
  }, [productInfo]);



  return (
    <div className="home-container">
      {/* Render ProductRegistrationPage only if productInfo is available */}
     <ProductRegistrationPage productInfo={productInfo} />

      <Button label="Product Register / LogIn" onClick={handleButtonClick} />

      <section className="getInspired">
        <h2>Get Inspired</h2>
        {productInfo && (
          <ImageBox
            backgroundImage={productInfo.backgroundImage}
            heading={productInfo.name}
            text="The only off-grid water solution you’ll ever need"
            link={productInfo.background}
          />
        )}
      </section>

      <Video
        heading="How to use that"
        videoUrl="https://www.youtube.com/embed/KR5dfovNP-s"
        videotitle="DOMETIC | Dometic GO Hydration Water Jug 11L"
      />
      <Video
        heading="Expand your experience"
        videoUrl="https://www.youtube.com/embed/IfU6i0osJWg"
        videotitle="DOMETIC | GO HYD-J11 Hydration Water Jug with Water Tap"
      />
      <ProductCard />
      <DownloadSection />
    </div>
  );
}

export default Home;
