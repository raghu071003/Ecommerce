import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 md:p-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Order Placed!</h1>
      <p className="text-lg mb-6">Thank you for your order. We are processing it and will notify you once it's shipped.</p>
      <p className="text-gray-600 mb-8">You can check your order history in your profile.</p>

      <button
        onClick={() => navigate('/profile')}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Go to Profile
      </button>
    </div>
  );
};

export default OrderConfirmation;
