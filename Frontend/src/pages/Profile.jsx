import axios from 'axios';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import LoginAlert from './LoginAlert';

const Profile = () => {
  const [user, setUser] = useState(null);
  const fetchData =async () =>{
    
    const res = await axios.post("http://localhost:8090/api/v1/user/profile",{},{withCredentials:true})

    setUser(res.data.data)

    }
    

  useEffect(() => {
      fetchData()
    // setUser(userData);
  }, []);

//   if (!user) {
//     return <div className="text-center py-4">Loading...</div>;
//   }

  return (
    <>
    {user ? 
    
    <div className="max-w-4xl mx-auto p-4">
        
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mt-4">{user.fullName}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.mobile}</p>
          <p className="text-gray-600">{user.address}</p>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          {/* Replace with actual order data */}
          <div className="bg-white shadow rounded-lg p-4 mb-4">
            <h3 className="font-bold text-lg">Order #12345</h3>
            <p className="text-gray-600">Placed on 2024-09-14</p>
            <p className="text-gray-600">Total: $150.00</p>
          </div>
          {/* More orders */}
        </div>
      </div>
    
    : <LoginAlert/>}
    
    </>
    
  );
};

export default Profile;
