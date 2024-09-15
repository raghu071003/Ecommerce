import React from 'react'
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router';

const Item = ({ name, price, quantity, image,size,key }) => {
  const { addToCart, removeFromCart, clearCart, updateItemQuantity } = useAuth();
  // console.log(key);
  const navigate = useNavigate()
  
  const handleRemove = ()=>{
    removeFromCart(key)
  }

  return (
    <div className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300 ease-in-out">
      {/* Image Section */}
      <div className="flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-32 h-32 object-cover rounded-lg shadow-lg"
        />
      </div>
      
      {/* Details Section */}
      <div className="ml-6 flex-1">
        <p className="text-xl font-semibold text-gray-900 truncate">{name}</p>
        <p className="text-lg font-bold text-gray-700 mt-1">₹{price}</p>
        <p className="text-sm text-gray-500 mt-2">Quantity: <span className="font-medium text-gray-800">{quantity}</span></p>
        <p className="text-sm text-gray-500 mt-2">Size: <span className="font-medium text-gray-800">{size}</span></p>
      </div>
      
      {/* Remove Button (optional) */}
      <button className="ml-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors duration-300 ease-in-out" onClick={handleRemove}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  )
}

export default Item
