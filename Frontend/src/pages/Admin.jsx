import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after login or signup
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For signup
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [address,setAddress] = useState('');
  const [number,setNumber] = useState('')
  const navigate = useNavigate();
  const {isAdmin,setisAdmin} = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(isAdmin);
    
    try {
      if (isSignup) {
        if (password !== confirmPassword) {
          setMessage('Passwords do not match.');
          setLoading(false);
          return;
        }
        await axios.post('http://localhost:8090/api/v1/admin/register', { email, password,number,address },{withCredentials:true});
        setMessage('Signup successful! Please login.');
        setIsSignup(false); // Switch to login form
      } else {
        const response = await axios.post('http://localhost:8090/api/v1/admin/login', { email, password },{withCredentials:true});
        setMessage('Login successful!');
        if(response.status === 200){
            setisAdmin(true)
        }
        navigate('/admin/dashboard'); // Redirect to admin dashboard or another page
      }
    } catch (error) {
      setMessage('Failed to submit. Please check your credentials or try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{isSignup ? 'Admin Signup' : 'Admin Login'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          {isSignup && (
            <> 
            <div>
              <label className="block text-sm font-medium text-gray-800">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-800">Mobile Number</label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-800">Address</label>
              <input
                type="textarea"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            </>
            
          )}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md font-semibold text-white ${
              loading ? 'bg-orange-300' : 'bg-orange-400'
            } hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50`}
            disabled={loading}
          >
            {loading ? (isSignup ? 'Signing up...' : 'Logging in...') : (isSignup ? 'Sign Up' : 'Login')}
          </button>
          {message && (
            <div className={`mt-4 p-2 rounded-md text-center ${
              message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-500 hover:underline"
          >
            {isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
