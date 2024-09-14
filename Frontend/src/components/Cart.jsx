import React from 'react';
import { useAuth } from '../Context/AuthContext';
import Item from './Item';


const CartComponent = () => {
  const { cartItem, addToCart, removeFromCart, clearCart, updateItemQuantity } = useAuth();
    console.log(cartItem);
    
  const handleAddItem = (item) => {
    addToCart(item);
    
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    updateItemQuantity(id, newQuantity);
  };

  


  return (
    <div>
      <h2 className='text-center text-3xl p-3 font-bold border-b-2 border-orange-400'>Your Cart</h2>
      {/* <button onClick={() => handleClearCart()}>Clear Cart</button> */}
      {cartItem.map((item,idx)=>{
        return <Item image={item.image} quantity={item.quantity} price={item.price} />
      })}
    </div>
  );
};

export default CartComponent;
