// src/components/AddProductForm.js
import React, { useState } from 'react';
import { categories } from '../utils/categories';
import axios from 'axios';

function AddProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleFrontImage = (e) => {
    setFrontImage(e.target.files[0]); // Set the first file from the file input
  };

  const handleBackImage = (e) => {
    setBackImage(e.target.files[0]); // Set the first file from the file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(stock <10) {
        setMessage("stock shouldnt be less than 10!")
        setLoading(false)
        return

    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    // formData.append('category', "");
    formData.append('stock', stock);
    if (frontImage) formData.append('front', frontImage);
    if (backImage) formData.append('back', backImage);

    try {
      const response = await axios.post('http://localhost:8090/api/v1/admin/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Product added successfully!');
      // Clear form fields
      setName('');
      setPrice('');
      setCategory('');
      setStock('');
      setFrontImage(null);
      setBackImage(null);
    } catch (error) {
      setMessage('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Front Image</label>
          <input
            type="file"
            onChange={handleFrontImage}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Back Image</label>
          <input
            type="file"
            onChange={handleBackImage}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required>
                {categories.map((item,idx)=>{
                    return <option value={item}>{item}</option>
                })}
        </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="text"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>

        {message && (
          <div className={`mt-4 p-2 ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-md`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default AddProductForm;
