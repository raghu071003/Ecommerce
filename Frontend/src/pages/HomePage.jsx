import React from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { Footer } from '../components/Footer';


const HomePage = () => (
  <div className="min-h-screen flex flex-col">
    <main className="flex-grow">
      <Hero />
      <ProductGrid />
    </main>
    <Footer/>
  </div>
);

export default HomePage;