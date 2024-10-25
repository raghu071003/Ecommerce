import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HistoryItem from './HistoryItem';
import { HistoryIcon } from 'lucide-react';

const History = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const res = await axios.post("https://aniclothing.onrender.com/api/v1/user/profile", {}, { withCredentials: true });
      // Slice the last 9 items directly before setting state
      const historyData = res.data.data.history;
      setData(historyData.slice(-9));
    } catch (err) {
      setError('Error fetching history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='p-3'>
      <div className='flex gap-3 text-2xl justify-center items-center border-b p-3'>
        <p>Your History</p>
        <HistoryIcon />
      </div>
      <div className='flex justify-center items-center p-3 gap-3'>
        {data.length !== 0 ? data.map((item, idx) => {
          const [id, img] = item.split(' ');
          return <HistoryItem key={id} img={img} id={id} />

        })
      :
      <p>No History Available</p>
      }
      </div>
    </div>
  );
};

export default History;
