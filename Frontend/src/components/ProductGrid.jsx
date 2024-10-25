import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Ensure to use 'react-router-dom'

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/v1/user/products');
        const productList = response.data;

        // Shuffle the products array
        const shuffledProducts = productList.sort(() => Math.random() - 0.5);

        // Get the first 6 products from the shuffled array
        const selectedProducts = shuffledProducts.slice(0, 6);

        setProducts(selectedProducts);
        // console.log(products);
        
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)} // Update the URL as per your routing
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
