import axios from 'axios';
import React, { useEffect } from 'react'
import HistoryItem from './HistoryItem';
import { useState } from 'react';
import { HistoryIcon } from 'lucide-react';
const History = () => {
    const [data,setData] = useState([]);

    const fetchData = async()=>{
        const res = await axios.post("http://localhost:8090/api/v1/user/profile",{},{withCredentials:true})
        setData(res.data.data.history)
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div className='p-3'>
        <div className='flex gap-3 text-2xl justify-center items-center border-b p-3'>
        <p >Your History  </p>
        <HistoryIcon/> 
        </div>
        <div className='flex justify-center items-center p-3 gap-3'>
        {data.map((item,idx)=>{
            return <HistoryItem img={item.split(' ')[1]} id={item.split(' ')[0]} />
        })}
        </div>
    </div>
  )
}

export default History