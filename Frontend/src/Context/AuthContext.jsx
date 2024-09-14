import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context with a default value
const AuthContext = createContext();

// Define the provider component
export const AuthContextProvider = ({ children }) => {
  const [isLogged, setIsLoggedIn] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  const [cartItem, setCartItem] = useState([]);

  // Add item to cart or update quantity if item already exists
  const addToCart = (item) => {
    setCartItem((prevCart = []) => {
      // Ensure prevCart is an array
      if (!Array.isArray(prevCart)) {
        console.error('Cart is not an array', prevCart);
        return [item];
      }
  
      // Check if the item already exists in the cart
      const existingItemIndex = prevCart.findIndex(i => i.id === item.id);
  
      if (existingItemIndex > -1) {
        // Item exists, update its quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity = Number(updatedCart[existingItemIndex].quantity) + Number(item.quantity);
        return updatedCart;
      } else {
        // Item does not exist, add it to the cart
        return [...prevCart, item];
      }
    });
  };

  // Remove item from cart by id
  const removeFromCart = (id) => {
    setCartItem((prevCart) => prevCart.filter(item => item.id !== id));
  };
  const clearCart = () => {
    setCartItem([]);
  };
  const updateItemQuantity = (id, newQuantity) => {
    setCartItem((prevCart) =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Fetch cart data from the server
  const fetchCart = async () => {
    try {
      const res = await axios.post("http://localhost:8090/api/v1/user/profile", {}, { withCredentials: true });
      setCartItem(res.data.data.cart);
      console.log(res.data.data);
      
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  const updateCart = async()=>{
    try{
      const res = await axios.post("http://localhost:8090/api/v1/user/updateCart",cartItem,{withCredentials:true})
      console.log(res);
      
    }catch(e){
      console.log(e);
      
    }
  }

  // Fetch cart items when component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    updateCart()
  }, [cartItem])
  

  // Context value
  const contextValue = {
    isLogged,
    setIsLoggedIn,
    isAdmin,
    setisAdmin,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    clearCart,
    updateItemQuantity,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

export default AuthContextProvider;
