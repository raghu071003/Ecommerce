import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLogged, setIsLoggedIn] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const fetchCartFromLocalStorage = () => {
    const savedCart = JSON.parse(localStorage.getItem('cartItem')) || [];
    setCartItem(savedCart);
  };

  const checkAuthStatus = async () => {
    const cachedAuth = JSON.parse(localStorage.getItem('authStatus'));
    const currentTime = new Date().getTime();

    if (cachedAuth && currentTime - cachedAuth.timestamp < 30 * 60 * 1000) { // 30 minutes
      setIsLoggedIn(cachedAuth.isLoggedIn);
      setUser(cachedAuth.user);
      fetchCartFromLocalStorage();
    } else {
      try {
        const response = await axios.post('https://aniclothing.onrender.com/api/v1/user/status', {}, { withCredentials: true });
        setIsLoggedIn(response.data.isLoggedIn);
        setUser(response.data.user);
        setCartItem(response.data.user.cart);

        localStorage.setItem('authStatus', JSON.stringify({
          isLoggedIn: response.data.isLoggedIn,
          user: response.data,
          cart: response.data.user.cart,
          timestamp: currentTime
        }));
      } catch (err) {
        setIsLoggedIn(false);
        setUser(null);
        setCartItem([]);
        localStorage.removeItem('authStatus');
        console.error('Authentication status check error:', err);
      }
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const updateCart = useCallback(async (newCart) => {
    if (isLogged) {
      try {
        await axios.post("https://aniclothing.onrender.com/api/v1/user/updateCart", newCart, { withCredentials: true });
        localStorage.setItem('cartItem', JSON.stringify(newCart)); // Update local storage
      } catch (error) {
        setError('Failed to update cart');
        console.error('Failed to update cart:', error);
      }
    }
  }, [isLogged]);

  const addToCart = async (item) => {
    setCartItem((prevCart) => {
      if (!Array.isArray(prevCart)) {
        console.error('Cart is not an array', prevCart);
        return [item];
      }
      const existingItemIndex = prevCart.findIndex(i => i.id === item.id && i.size === item.size);

      let newCart;
      if (existingItemIndex > -1) {
        newCart = [...prevCart];
        newCart[existingItemIndex].quantity = Number(newCart[existingItemIndex].quantity) + Number(item.quantity);
      } else {
        newCart = [...prevCart, item];
      }
      updateCart(newCart);
      return newCart;
    });
  };

  const removeFromCart = async (id) => {
    setCartItem((prevCart) => {
      const newCart = prevCart.filter(item => item.id !== id);
      updateCart(newCart);
      return newCart;
    });
  };

  const clearCart = async () => {
    setCartItem([]);
    updateCart([]);
  };

  const updateItemQuantity = async (id, newQuantity) => {
    setCartItem((prevCart) => {
      const newCart = prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      );
      updateCart(newCart);
      return newCart;
    });
  };

  const contextValue = {
    isLogged,
    setIsLoggedIn,
    user,
    setUser,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    clearCart,
    updateItemQuantity,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

export default AuthContextProvider;
