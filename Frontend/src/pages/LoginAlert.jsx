import React from 'react';

const LoginAlert = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <svg className="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6M12 9v6M5.121 18.379a9 9 0 1112.758 0M4.5 4.5a9 9 0 1115 15" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Access Restricted</h2>
        <p className="text-center text-gray-600 mb-6">
          Please <span className="font-semibold text-orange-400">log in first</span> to access this content.
        </p>
        <div className="flex justify-center">
          <a
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginAlert;
