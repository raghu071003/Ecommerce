import React from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';


const HomePage = () => (
  <div className="min-h-screen flex flex-col">
    <main className="flex-grow">
      <Hero />
      <ProductGrid />
    </main>
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p>&copy; 2024 E-Shop. All rights reserved.</p>
    </footer>
  </div>
);

export default HomePage;