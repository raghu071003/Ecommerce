import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-orange-400">YourStore</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-white hover:border-b border-white px-3 py-2 text-sm font-medium">Home</a>
                <a href="#" className="text-white hover:border-b border-white px-3 py-2 text-sm font-medium">Products</a>
                <a href="#" className="text-white hover:border-b border-white px-3 py-2 text-sm font-medium">About</a>
                <a href="#" className="text-white hover:border-b border-white px-3 py-2 text-sm font-medium">Contact</a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-white hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white">
                <ShoppingCart className="h-6 w-6" />
              </button>
              <button className="ml-3 p-1 rounded-full text-white hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-orange-400 hover:border-b border-white focus:outocus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-white hover:border-b border-white block px-ded-md text-base font-medium">Home</a>
            <a href="#" className="text-white hover:border-b border-white block px-ded-md text-base font-medium">Products</a>
            <a href="#" className="text-white hover:border-b border-white block px-ded-md text-base font-medium">About</a>
            <a href="#" className="text-white hover:border-b border-white block px-ded-md text-base font-medium">Contact</a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <button className="ml-auto p-1 rounded-full text-white hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white">
                <ShoppingCart className="h-6 w-6" />
              </button>
              <button className="ml-4 p-1 rounded-full text-white hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;