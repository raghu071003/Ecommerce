import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([
    // This should be populated from your cart state or context
    { id: 1, name: 'Product 1', quantity: 2, price: 100 },
    { id: 2, name: 'Product 2', quantity: 1, price: 150 }
  ]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(''); // For example: 'Credit Card', 'PayPal'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Assuming you have an API endpoint to process orders
      const response = await axios.post('http://localhost:8090/api/v1/checkout', {
        cartItems,
        shippingAddress,
        paymentMethod
      });
      setSuccess('Order placed successfully!');
      // Optionally, clear cart and navigate to a confirmation page
      navigate('/confirmation');
    } catch (error) {
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold mt-4">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <input
            type="text"
            placeholder="Enter your shipping address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
          <div className="flex gap-4 mb-4">
            <label>
              <input
                type="radio"
                value="Credit Card"
                checked={paymentMethod === 'Credit Card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              PayPal
            </label>
          </div>
          {paymentMethod === 'Credit Card' && (
            <div>
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
                required
              />
              <input
                type="text"
                placeholder="Expiry Date"
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
                required
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
          )}
          {paymentMethod === 'PayPal' && (
            <p>Redirecting to PayPal...</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
      </form>
    </div>
  );
};

export default Checkout;
