import React from 'react'
import Navbar from '../components/Navbar'

const Login = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <form action="" className="w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-4">Login In</h2>
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
                        Login
                    </button>
                </form>
            </div>

        </div>
    )
}

export default Login