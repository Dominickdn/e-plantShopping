import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, addItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = (cart) => {
    let cartItems = cart.map(item => 
      parseInt((item.cost).replace("$", "")) * item.quantity
    )
    let sum = cartItems.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    return sum;
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e); 
  };


  const handleIncrement = (item) => {
     dispatch(addItem(item));
  };

  const handleDecrement = (item) => {
    if(item.quantity===1){
      dispatch(removeItem(item.name));
    } else{
      dispatch(updateQuantity({name:item.name,quantity:item.quantity-1}));
  } 
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return item.quantity*parseInt(item.cost.slice(1));
  };

  const totalAmount = calculateTotalAmount(cart)

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${totalAmount}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


