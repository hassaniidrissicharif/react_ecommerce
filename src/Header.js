
// Header.js
import React, {useState} from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import './Header.css'; // Import the CSS file for styling

const Header = () => {
    const cartItems = [/* ... */];
    const [isLoggedIn, setLoggedIn] = useState(false); // Set initial authentication status

    const handleLogout = () => {
        // Logic for handling user logout
        setLoggedIn(false);
    };
    const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language

    const handleLanguageChange = (event) => {
        // Update the selected language
        setSelectedLanguage(event.target.value);
        // You can implement logic here to change the language in your application
        // For example, using an internationalization library or updating a context
    };
    const [isCartPreviewOpen, setCartPreviewOpen] = useState(false);

    const handleCartIconHover = () => {
        // Open the cart preview when the cart icon is hovered
        setCartPreviewOpen(true);
    };

    const handleCartPreviewClose = () => {
        // Close the cart preview when the mouse leaves the preview
        setCartPreviewOpen(false);
    };
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);

    const handleNotificationsIconClick = () => {
        // Toggle the visibility of the notifications dropdown
        setNotificationsOpen((prev) => !prev);
    };
    return (
        <div className="header">
            <div className="logo-container">
                <Link to="/">
                    <img src="./assets/logo.jpg" alt="Logo" />
                </Link>
            </div>
            <nav className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                {/* Add more navigation links as needed */}
            </nav>

            <div className="search-bar">
                <input type="text" placeholder="Search products" />
                <button>Search</button>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Categories</button>
                <div className="dropdown-content">
                    <Link to="/category1">Category 1</Link>
                    <Link to="/category2">Category 2</Link>
                    {/* Add more links for other categories */}
                </div>
            </div>
            <div className="user-profile">
                <Link to="/UserProfile">
                    <img src="/path/to/user-profile-icon.png" alt="User Profile" />
                </Link>
            </div>

            <div className="auth-section">
                {isLoggedIn ? (
                    // Display Logout button if the user is logged in
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    // Display Login button if the user is not logged in
                    <Link to="/login">Login</Link>
                )}
            </div>
            <div className="language-switcher">
                <label htmlFor="languageSelect">Select Language:</label>
                <select
                    id="languageSelect"
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    {/* Add more language options as needed */}
                </select>
            </div>
            <div
                className="cart-container"
                onMouseEnter={handleCartIconHover}
                onMouseLeave={handleCartPreviewClose}
            >
                <img src="/path/to/cart-icon.png" alt="Cart" />

                {/* Cart badge showing the number of items in the cart */}
                <div className="cart-badge">{/* Your cart item count logic here */}</div>

                {/* Cart preview dropdown */}
                {isCartPreviewOpen && (
                    <div className="cart-preview">
                        {/* Cart items summary */}
                        {/* Example: Display a list of product names and quantities */}
                        <ul>
                            <li>Product 1 - Quantity: 2</li>
                            <li>Product 2 - Quantity: 1</li>
                            {/* Add more items as needed */}
                        </ul>

                        {/* View Cart and Checkout buttons */}
                        <div className="cart-actions">
                            <Link to="/cart">View Cart</Link>
                           
                        </div>
                    </div>
                )}
            </div>
            <div className="notifications-icon" onClick={handleNotificationsIconClick}>
                <img src="/path/to/notifications-icon.png" alt="Notifications" />

                {/* Optional: Display a badge for unread notifications */}
                <div className="notifications-badge">{/* Your notification count logic here */}</div>
            </div>

            {/* Notifications dropdown */}
            {isNotificationsOpen && (
                <div className="notifications-dropdown">
                    {/* Example: Display a list of notifications */}
                    <ul>
                        <li>
                            <strong>Order Confirmation:</strong> Your order has been successfully placed.
                        </li>
                        <li>
                            <strong>Promotional Offer:</strong> Don't miss our exclusive sale! Shop now.
                        </li>
                        {/* Add more notifications as needed */}
                    </ul>
                </div>
            )}
        </div>

    );
};

export default Header;
