// CartContext.js

import React, { createContext, useReducer, useContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

// CartContext.js

// ... (existing code)

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { ...state, cartItems: [...state.cartItems, action.payload] };
        case 'INCREASE_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };
        case 'DECREASE_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
            };
        // Add more cases for other actions if needed
        default:
            return state;
    }
};

// ... (rest of the code)


const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    );
};

const useCartState = () => {
    const context = useContext(CartStateContext);
    if (!context) {
        throw new Error('useCartState must be used within a CartProvider');
    }
    return context;
};

const useCartDispatch = () => {
    const context = useContext(CartDispatchContext);
    if (!context) {
        throw new Error('useCartDispatch must be used within a CartProvider');
    }
    return context;
};

const useCart = () => {
    const state = useCartState();
    const dispatch = useCartDispatch();
    return [state, dispatch];
};

export { CartProvider, useCart };
