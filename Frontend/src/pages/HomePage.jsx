import React, { useEffect } from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { Footer } from '../components/Footer';
import History from '../components/History';
import { useAuth } from '../Context/AuthContext';

const HomePage = () => {
  
  const {isLogged} = useAuth();
  useEffect(()=>{

  },[])
  
  return(
  <div className="min-h-screen flex flex-col">
    <main className="flex-grow">
      <Hero />
      <ProductGrid />
    </main>
    {isLogged && <History />}
    <Footer/>
  </div>
)};

export default HomePage;