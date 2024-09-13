import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage,setActiveImage] = useState()
  const { id } = useParams(); // Fetch the product ID from the URL

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/api/v1/user/product/${id}`);
        setProduct(response.data);
        setActiveImage(response.data.image[0])
      } catch (error) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-lg font-semibold text-red-600">{error}</p>;
  if (!product) return <p className="text-center text-lg font-semibold">No product data available</p>;

  return (
    <div className='container mx-auto p-6 md:p-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='flex justify-center items-center'>
            <div>
                {product.image.map((items,idx)=>(<img src={items} className='w-20 border rounded-xl m-3 cursor-pointer hover:border-gray-800' onClick={()=>setActiveImage(items)}/>))}
            </div>
          <img src={activeImage} alt={product.name} className='w-full max-w-md rounded-lg shadow-lg' />
        </div>
        <div className='flex flex-col justify-center'>
          <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
          <p className='text-xl text-gray-800 mb-4'>₹{product.price}</p>
          <p className='text-gray-600 mb-6'>{product.description || 'No description available'}</p>
          <div className='flex gap-4'>
            <button className='bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out'>
              Add to Cart
            </button>
            <button className='bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out'>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
