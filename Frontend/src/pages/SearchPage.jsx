import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';

const SearchPage = () => {
    const navigate = useNavigate();
    const { query } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (query.trim() === "") {
                return;
            }
            try {
                const res = await axios.get(`http://localhost:8090/api/v1/user/search/${query}`);
                setData(res.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [query]);

    return (
        <div>
            <div className='text-center text-4xl font-bold p-4'>Results for {query}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {data.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                        onClick={() => navigate(`/product/${product._id}`)}
                    >
                        <img
                            src={product.image[0]}
                            alt={product.name}
                            className="w-full h-48 object-contain mb-4 rounded"
                            loading="lazy" // Enable lazy loading
                        />
                        <h3 className="text-xl font-semibold mb-2 truncate w-96">{product.name}</h3>
                        <p className="text-gray-600 mb-4">₹{product.price}</p>
                        <button className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;
