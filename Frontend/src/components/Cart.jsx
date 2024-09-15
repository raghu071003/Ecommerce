import React from 'react';
import { useAuth } from '../Context/AuthContext';
import Item from './Item';
import { useNavigate } from 'react-router';

const CartComponent = () => {
  const { cartItem, removeFromCart, clearCart } = useAuth();
  const navigate = useNavigate()

  // Function to handle clearing the cart
  const handleClearCart = () => {
    clearCart();
  };

  // Calculate total price
  const total = cartItem?.reduce((accumulator, item) => {
    return accumulator + Number(item.price) * Number(item.quantity); // Include quantity in total
  }, 0);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6 border-b-2 border-orange-400 pb-2">
        Your Cart
      </h2>

      {/* Clear Cart Button */}
      <button
        onClick={handleClearCart}
        className="block mx-auto mb-6 bg-orange-400 text-white rounded-full px-6 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors duration-300 ease-in-out"
      >
        Clear Cart
      </button>

      {cartItem?.length > 0 ? (
        <div className="space-y-4">
          {cartItem.map((item) => (
            <Item
              key={item.id}
              image={item.image}
              quantity={item.quantity}
              price={item.price}
              size={item.size}
              name={item.name}
            />
          ))}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md mt-6 flex justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 text-center">Cart Total</h1>
              <p className="text-xl font-semibold text-orange-600 text-center mt-2">₹{total.toFixed(2)}</p>
            </div>
            <div>
              <button className='text-xl bg-orange-400 rounded-xl p-3 hover:orange' onClick={()=>navigate("/checkoutCart")}>CheckOut</button>
            </div>
          </div>

        </div>

      ) : (
        <p className="text-center text-lg text-gray-600 mt-8">Your cart is empty.</p>
      )}


    </div>
  );
};

export default CartComponent;
