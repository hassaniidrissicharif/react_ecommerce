import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Products from './ProductListing';
import UserProfile from "./UserProfile";
import CheckoutPage from "./CheckoutPage";
import Cart from "./Cart";


const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/UserProfile" element={<UserProfile />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/cart" element={<Cart/>}/>



                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
