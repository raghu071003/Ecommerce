import React, { useState } from 'react';
// import ShirtModel from '../components/ShirtModel';

const DesignPage = () => {
  const [color, setColor] = useState('#ffffff');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">3D Shirt Designer</h1>

      <div className="flex flex-col items-center mb-4">
        {/* <ShirtModel color={color} /> */}
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Shirt Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-16 h-16"
        />
      </div>
    </div>
  );
};

export default DesignPage;
