import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const { id } = useParams();
  const { cartItem, addToCart } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/api/v1/user/product/${id}`,{withCredentials:true});
        setProduct(response.data);
        setActiveImage(response.data.image[0]);
      } catch (error) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const handleCart = () => {
    setLoading(true)
    if (!selectedSize) {
      alert('Please select a size');
      setLoading(false)
      return;
    }

    const newItem = { id:product._id,name:product.name, quantity, size:selectedSize,price:product.price,image:product.image[0] };
    addToCart(newItem)
    setLoading(false)
  };

  // if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-lg font-semibold text-red-600">{error}</p>;
  if (!product) return <p className="text-center text-lg font-semibold">No product data available</p>;

  return (
    <div className='container mx-auto p-6 md:p-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='flex flex-col items-center'>
          <div className='flex flex-wrap justify-center'>
            {product.image.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt={`Thumbnail ${idx}`} 
                className='w-20 border rounded-xl m-2 cursor-pointer hover:border-gray-800' 
                onClick={() => setActiveImage(img)} 
              />
            ))}
          </div>
          <img 
            src={activeImage} 
            alt={product.name} 
            className='w-full max-w-md rounded-lg shadow-lg' 
          />
        </div>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
          <p className='text-xl text-gray-800 mb-4 font-bold'>₹{product.price}<span className='text-sm m-3'>includes 5% off </span></p>
          <p className='text-sm text-gray-800 mb-4 line-through'>₹{product.sellPrice}</p>
          <p className='text-gray-600 mb-6'>{product.description || 'No description available'}</p>

          <div className='flex mb-6 items-center'>
            <p className='mx-2 text-lg font-semibold'>Size:</p>
            <div className='flex gap-2'>
              {sizeOptions.map((size, idx) => (
                <p 
                  key={idx}
                  className={`border p-5 rounded-full cursor-pointer ${selectedSize === size ? 'bg-gray-200 border-black' : 'hover:border-black focus:bg-gray-200'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </p>
              ))}
            </div>
          </div>

          <div className='mb-6'>
            <h2 className='text-lg font-semibold mb-2'>Quantity</h2>
            <div className='flex items-center'>
              <button 
                onClick={decrementQuantity}
                className='bg-gray-300 text-gray-700 py-2 px-4 rounded-l-md hover:bg-gray-400'
              >
                -
              </button>
              <input 
                type='number'
                value={quantity}
                readOnly
                className='p-2 border-t border-b border-gray-300 w-16 text-center'
              />
              <button 
                onClick={incrementQuantity}
                className='bg-gray-300 text-gray-700 py-2 px-4 rounded-r-md hover:bg-gray-400'
              >
                +
              </button>
            </div>
          </div>

          <div className='flex items-center mb-6'>
            <span className='text-xl font-semibold mr-2'>Rating:</span>
            <span className='text-yellow-500'>{'★'.repeat(Math.round(product.rating))}</span>
            <span className='text-gray-600 ml-2'>{product.rating} ({product.reviews.length} reviews)</span>
          </div>
          <div className='flex gap-4'>
            <button 
              className='bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out'
              onClick={handleCart}
            >
              {loading ? "Please Wait" :"Add to Cart"}
            </button>
            <button 
              className='bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out'
              onClick={()=>navigate(`/checkout/${product._id}`)}
            >
              Buy Now
            </button>
          </div>

          <div className='mt-6'>
            <h2 className='text-2xl font-semibold mb-2'>Reviews</h2>
            {product.reviews.length > 0 ? (
              <div>
                {product.reviews.map((review, idx) => (
                  <div key={idx} className='border p-4 rounded-lg mb-4 shadow-sm'>
                    <div className='flex items-center mb-2'>
                      <span className='font-semibold'>{review.user}</span>
                      <span className='text-yellow-500 ml-2'>{'★'.repeat(review.rating)}</span>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews available</p>
            )}
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Product;
