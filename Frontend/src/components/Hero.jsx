import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Welcome to Ani
          <span 
            className={`text-orange-400 transition-opacity duration-1000 ${
              animate ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Clothing
          </span>
        </h2>
        <p className="text-xl mb-8">Discover amazing products at unbeatable prices!</p>
        <button className="bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-orange-500 transition duration-300">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;