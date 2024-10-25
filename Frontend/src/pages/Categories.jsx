import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sort from '../components/Sort'; // Import the Sort component

const Categories = () => {
  const categories = ["Shoes", "T-Shirt", "Hoodies", "Pants"];
  const [category, setCategory] = useState("Shoes");
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("price-asc"); // Default sorting criteria
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products based on selected category and sort order
  const fetchProducts = async (category, sortBy) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`http://localhost:8090/api/v1/user/category/${category}?sort=${sortBy}`);
      setProducts(res.data);
    } catch (e) {
      setError('Failed to fetch products');
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts(category, sortBy);
  }, [category, sortBy]);

  const handleCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div className='flex flex-col'>
      <div className='flex justify-center items-center text-4xl font-bold m-3'>
        <h1>Categories</h1>
      </div>
      <div className='flex gap-4 bg-gray-600 justify-center m-3'>
        {categories.map((item, idx) => (
          <p
            key={idx}
            className={`p-3 cursor-pointer text-lg hover:border-b text-white ${item === category ? 'border-b-2 border-orange-400' : ''}`}
            onClick={() => handleCategory(item)}
          >
            {item}
          </p>
        ))}
      </div>
      <Sort sortBy={sortBy} setSortBy={setSortBy} /> {/* Add Sort component */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-3">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.image[0]} // Assuming image is an array and using the first image
                alt={product.name}
                className="w-full h-48 object-contain mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2 truncate w-48">{product.name}</h3>
              <div className='flex gap-3'>
              <p className="text-gray-600 mb-4 font-bold">₹{product.price}</p>
              <p className="text-gray-600 mb-4 font-semibold line-through">₹{product.sellPrice}</p>
              </div>
              <button className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 transition duration-300">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          !loading && <p className="text-center text-lg text-gray-600">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
