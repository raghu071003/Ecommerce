import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import LoginAlert from './LoginAlert';
import { Edit, X, Trash } from 'lucide-react';
import { useNavigate } from 'react-router';

const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-gray-600"></div>
  </div>
);

const EditForm = ({ formData, handleChange, handleSubmit, isLoading, onCancel, handleAddAddress, handleRemoveAddress }) => (
  <form onSubmit={handleSubmit} className="w-full max-w-lg">
    {['fullName', 'email', 'mobile'].map((field) => (
      <div className="w-full px-3 mb-6" key={field}>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={field}>
          {field.charAt(0).toUpperCase() + field.slice(1)}
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id={field}
          type={field === 'email' ? 'email' : 'text'}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          required
        />
      </div>
    ))}

    <div className='px-3'>
      <h1 className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Addresses</h1>
      {formData.address.map((addr, index) => (
        <div key={index} className="mb-6">
          {['House_No', 'City', 'State', 'Pincode'].map((field) => (
            <div className="w-full mb-3" key={field}>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id={field}
                type="text"
                name={`address[${index}].${field.toLowerCase()}`}
                value={addr[field] || ''}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="button" className="text-red-500" onClick={() => handleRemoveAddress(index)}>
            <Trash size={16} /> Remove Address
          </button>
        </div>
      ))}
      <button type="button" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-3" onClick={handleAddAddress}>
        Add Address
      </button>
    </div>

    <div className="flex items-center justify-between">
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Updating...' : 'Update Profile'}
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  </form>
);

const Profile = () => {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const { setIsLoggedIn } = useAuth();
  const [formData, setFormData] = useState({ fullName: '', email: '', mobile: '', address: [] });
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.post("http://localhost:8090/api/v1/user/profile", {}, { withCredentials: true });
      const orderRes = await axios.post("http://localhost:8090/api/v1/user/getOrders", {}, { withCredentials: true });

      setUser(res.data.data);
      setOrders(orderRes.data.data);
      console.log(orderRes.data.data);

      setFormData({
        ...res.data.data,
        address: res.data.data.address.map(addr => ({
          House_No: addr.House_No || '',
          City: addr.City || '',
          State: addr.State || '',
          Pincode: addr.Pincode || '',
        })),
      });
    } catch (err) {
      setError("Failed to load user profile");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [key, index, field] = name.split(/[.\[\]]+/).filter(Boolean);

    if (key === 'address') {
      setFormData(prevData => {
        const updatedAddresses = [...prevData.address];
        updatedAddresses[index] = { ...updatedAddresses[index], [field]: value };
        return { ...prevData, address: updatedAddresses };
      });
    } else {
      setFormData(prevData => ({ ...prevData, [key]: value }));
    }
  };

  const handleAddAddress = () => {
    setFormData(prevData => ({
      ...prevData,
      address: [...prevData.address, { House_No: '', City: '', State: '', Pincode: '' }]
    }));
  };

  const handleRemoveAddress = (index) => {
    setFormData(prevData => ({
      ...prevData,
      address: prevData.address.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.put('http://localhost:8090/api/v1/user/update-profile', formData, {
        withCredentials: true
      });

      if (response.data.statusCode === 200) {
        setUser(formData);
        setIsLoggedIn(true);
        setEdit(false);
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingData) {
    return <LoadingScreen />;
  }

  return (
    <>
      {user ? (
        <div className="max-w-4xl mx-auto p-4">
          {edit ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Edit Profile</h1>
                <button className="text-gray-600 hover:text-gray-800" onClick={() => setEdit(false)}>
                  <X size={24} />
                </button>
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <EditForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                onCancel={() => setEdit(false)}
                handleAddAddress={handleAddAddress}
                handleRemoveAddress={handleRemoveAddress}
              />
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className='flex items-center justify-center gap-2'>
                <h1 className="text-3xl font-bold mt-4">{user.fullName}</h1>
                <button className='bg-orange-400 rounded-xl p-2 text-lg' onClick={() => setEdit(true)}>
                  <Edit />
                </button>
              </div>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.mobile}</p>
              {user.address.length > 0 ?
                user.address.map((address, index) => (
                  <p className="text-gray-600" key={index}>{`${address.House_No}, ${address.City}, ${address.State}, ${address.Pincode}`}</p>
                ))
                :
                <p className='text-gray-600'>Please click on Edit Profile to Add Address</p>
              }
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 bg-gray-800 w-screen text-white p-2 text-center">Order History</h2>
                {orders && orders.length > 0 ? (
                  orders.map((item) => (
                    <div key={item._id} className='flex bg-white shadow rounded-lg p-4 mb-4 items-center justify-center'>
                      <div className="">
                        <h3 className="font-bold text-lg">Order ID: {item._id}</h3>
                        <p className="text-gray-600">Placed on: {new Date(item.createdAt).toLocaleDateString()}</p>
                        <p className="text-gray-600">Total: ₹{item.totalAmount.toFixed(2)}</p>
                        <p className="text-gray-600">Status: {item.status}</p>
                      </div>
                      <div className="ml-4 flex">
                        {item.items.map((product) => (
                          <div key={product._id} className="flex flex-col items-center">
                            {product.product.image && product.product.image.length > 0 ? (
                              <img src={product.product.image[0]} className='w-16 hover:scale-110 cursor-pointer' alt={product.product.name} onClick={() => navigate(`/product/${product.productId}`)} />
                            ) : (
                              <span className="text-gray-500">No Image Available</span>
                            )}
                            <p className="text-gray-600 truncate w-32">{product.product.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No orders found.</p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <LoginAlert />
      )}
    </>
  );
};

export default Profile;

