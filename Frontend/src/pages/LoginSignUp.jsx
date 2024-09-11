import React, { useState } from 'react';
import axios from "axios"

const AuthComponent = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [mobile,setMobile] = useState();
  const [loading,setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post(
        "http://localhost:8090/api/v1/user/login",
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (response.data && response.status === 200) {
        setMessage('Login successful!');
        // Handle successful login (e.g., store token, redirect)
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.response?.data?.message || 'An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async(e) => {
    e.preventDefault();
    // Implement signup logic here
    setIsLoading(true)
    try {
      const response = await axios.post(
        "http://localhost:8090/api/v1/user/register",
        {
          email,
          password,
          mobile,
          fullName:name
        },
        {
          headers:{
            "Content-Type":"application/json"
          }
        }
      )
      // console.log(response);
      
      if(response.data && response.status === 200){
        setMessage("UserCreated! Please Login")
      }
    } catch (error) {
        setIsLoading(false)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
      <div className="p-8 m-2">
        <h2 className="text-4xl font-bold text-center mb-6 text-white">My Store</h2>
        <div className="flex mb-4 gap-3">
          <button
            className={`flex-1 py-2 rounded-xl ${activeTab === 'login' ? 'bg-orange-400 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 rounded-xl ${activeTab === 'signup' ? 'bg-orange-400 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('signup')}
          >
            Signup
          </button>
        </div>
        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4 flex flex-col gap-3">
            <div className='p-3'>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 p-3 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className='p-3'>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-3 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className='flex justify-between items-center text-orange-400'>
                <div>
                  <input type="checkbox" /> Remember Me
                </div>
              <button className='text-orange-400 text-end'>Forgot Password?</button>
            </div>
            
            <button
              type="submit"
              className="w-full h-12 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-bg-orange-400"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className='p-3'>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 p-3 block h-8 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className='p-3'>
              <label htmlFor="signup-email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 p-3 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className='p-3'>
              <label htmlFor="signup-password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-3 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className='p-3'>
              <label htmlFor="signup-mobile" className="block text-sm font-medium text-white">
                Mobile
              </label>
              <input
                id="signup-mobile"
                type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="mt-1 h-8 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-bg-orange-400"
            >
              Sign Up
            </button>
          </form>
        )}
        {
        
        loading ? <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
        <p>Please Wait....</p>
      </div>
        :
        message && (
          <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthComponent;