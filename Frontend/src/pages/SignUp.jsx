import React from 'react';

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <form action="" className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="mobile" className="text-gray-700 mb-1">Mobile</label>
          <input
            type="number"
            id="mobile"
            min={999999999}
            max={10000000000}
            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="text-gray-700 mb-1">Password</label>
          <input
            type="password"
            id="password"
            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;