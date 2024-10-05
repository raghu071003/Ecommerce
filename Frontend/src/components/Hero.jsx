import React, { useState, useEffect } from 'react';
import img1 from '../assets/DSBanner.jpg';
import img2 from '../assets/NarutoBanner.jpg';
import img3 from '../assets/Bleach.jpg';


const banners = [img1, img2, img3];

const YourComponent = () => {
  const [bannerIdx, setBannerIdx] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('fade-out'); // Start fade-out effect
      setTimeout(() => {
        setBannerIdx(prev => (prev + 1) % banners.length);
        setFadeClass('fade-in');
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const backgroundImageStyle = {
    backgroundImage: `url(${banners[bannerIdx]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    padding: '40px 20px',
    borderRadius: '8px',
  };

  return (
    <section className="bg-gray-800 py-20 h-96 relative">
      <div
        className={`absolute inset-0 z-0 ${fadeClass}`}
        style={backgroundImageStyle}
      ></div>
      <div className='absolute top-0 left-0 h-96 w-full bg-black opacity-75 z-10'>
      </div>
      <div className="relative container mx-auto text-center z-20 ">
        <h2 className="text-4xl font-bold mb-4 text-white">
          Welcome to Ani
          <span 
            className={`text-orange-400 transition-opacity duration-1000`}
          >
            Clothing
          </span>
        </h2>
        <p className="text-xl text-white">Discover amazing products at unbeatable prices!</p>
        {/* <button className="bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-orange-500 transition duration-300">
          Shop Now
        </button> */}
      </div>
    </section>
  );
};

export default YourComponent;
