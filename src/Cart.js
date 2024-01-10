// Cart.js

import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import './Cart.css'; // Import the Cart.css file


const Cart = () => {
    const { state, dispatch } = useCart();
    const cartItems = state ? state.cartItems : [];

    // Function to handle removing a product from the cart
    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    // Calculate total quantity and total price dynamically
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <ul className="cart-items">
                {cartItems.map((item) => (
                    <li key={item.id} className="cart-item">
                        <div className="item-info">
                            <p>{item.name}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <p>Total Price: ${item.price * item.quantity}</p>
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <Link to="/checkout">
                <button>Checkout</button>
            </Link>
        </div>
    );
};

export default Cart;
