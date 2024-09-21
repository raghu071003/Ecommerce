import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Checkout = () => {
  const { cartItem } = useAuth();
  const [shippingAddress, setShippingAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [address, setAddress] = useState([]);
  const navigate = useNavigate();

  // Fetch user profile and addresses
  const fetchUser = async () => {
    try {
      const res = await axios.post("http://localhost:8090/api/v1/user/profile", {}, { withCredentials: true });
      setAddress(res.data.data.address);
      // Automatically set the first address as the shipping address if available
      if (res.data.data.address.length > 0) {
        setShippingAddress(res.data.data.address[0]); // Set the entire address object
      }
    } catch (err) {
      setError("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Calculate total price
  const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const orderData = {
      address: shippingAddress,
      paymentMethod,
      items: cartItem.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: totalPrice
    };

    try {
      const response = await axios.post('http://localhost:8090/api/v1/user/orders', orderData, { withCredentials: true });
      if (response.status === 201) {
        setSuccess('Order placed successfully!');
        navigate('/confirmation');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-4">
            {cartItem.map(item => (
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
          <select
            value={address.findIndex(addr => addr.House_No === shippingAddress.House_No)} // Find index based on House_No
            onChange={(e) => {
              const selectedAddress = address[e.target.value];
              setShippingAddress(selectedAddress);
            }}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>Select an address</option>
            {address.map((item, index) => (
              <option key={index} value={index}>
                {`${item.House_No}, ${item.City}, ${item.State}, ${item.Pincode}`}
              </option>
            ))}
          </select>
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
                value="UPI"
                checked={paymentMethod === 'UPI'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              UPI
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
          {paymentMethod === 'UPI' && (
            <p>Redirecting to UPI...</p>
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
