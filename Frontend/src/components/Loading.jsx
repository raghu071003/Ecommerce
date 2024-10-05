import React, { useState, useEffect } from 'react';

const Loading = () => {
  const [animation, setAnimation] = useState('fade-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation((prevAnimation) => (prevAnimation === 'fade-in' ? 'fade-out' : 'fade-in'));
    }, 1000);
    return () => clearInterval(interval);
  }, []); 

  return (
    <div className='h-screen w-screen flex justify-center items-center absolute top-0 left-0 -z-10'>
      <div className='text-4xl font-bold'>
        Ani<span className={`${animation} text-orange-400`}>Clothing</span>
      </div>
    </div>
  );
};

export default Loading;
