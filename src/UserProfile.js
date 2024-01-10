// UserProfile.js

import React, { useState, useEffect } from 'react';
import './UserProfile.css'; // Import your CSS file

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState(null);
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [orderHistory, setOrderHistory] = useState([]);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [addressForm, setAddressForm] = useState({
        street: '',
        city: '',
        zipCode: '',
    });

    const [addresses, setAddresses] = useState([]);
    const [wishlist, setWishlist] = useState([]);


    useEffect(() => {
        // Fetch user data from the provided API
        fetch('https://randomuser.me/api/')
            .then((response) => response.json())
            .then((data) => setUserData(data.results[0]))
            .catch((error) => console.error('Error fetching user data:', error));


        fetch('https://dummyjson.com/products/1')
            .then((response) => response.json())
            .then((productData) => {
                // Creating an example order based on product data
                const order = {
                    orderId: 1,
                    date: new Date().toLocaleDateString(),
                    total: productData.price,
                };
                setOrderHistory([order]);
            });

        fetch('https://api.example.com/user/addresses')
            .then((response) => response.json())
            .then((data) => setAddresses(data));

        fetch('https://api.example.com/user/wishlist')
            .then((response) => response.json())
            .then((data) => setWishlist(data));
    }, []); // The empty dependency array ensures the effect runs once after the component mounts


    const handleEditClick = () => {
        // Enable editing and initialize the edited user data with the current user data
        setIsEditing(true);
        setEditedUserData({ ...userData });
    };

    const handleCancelEdit = () => {
        // Cancel editing and reset the edited user data
        setIsEditing(false);
        setEditedUserData(null);
        setNewProfilePicture(null);
    };

    const handleSaveEdit = () => {
        // Save the edited user data and new profile picture
        setUserData({ ...editedUserData, picture: { ...userData.picture, large: newProfilePicture } });
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        // Update the edited user data when input fields change
        setEditedUserData({
            ...editedUserData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        // Handle the selection of a new profile picture file
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setNewProfilePicture(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setNewProfilePicture(null);
        }
    };
    const handlePasswordChange = (e) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        // Add logic to handle password change, e.g., send data to server
        console.log('Password change submitted:', passwordForm);
        // Clear the form after submission
        setPasswordForm({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };
    const handleAddressChange = (e) => {
        setAddressForm({
            ...addressForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitAddress = (e) => {
        e.preventDefault();
        // Add logic to handle address submission, e.g., send data to server
        console.log('Address submitted:', addressForm);
        // Clear the form after submission
        setAddressForm({
            street: '',
            city: '',
            zipCode: '',
        });
    };
    const handleDeleteAddress = (addressId) => {
        // Add logic to delete the address, e.g., send a request to the server
        console.log('Deleting address with ID:', addressId);
    };
    const handleRemoveFromWishlist = (productId) => {
        // Add logic to remove the product from the wishlist, e.g., send a request to the server
        console.log('Removing product with ID from wishlist:', productId);
    };


    return (
        <div className="user-profile">
            {userData && !isEditing && (
                <>
                    <div className="profile-picture">
                        <img src={userData.picture.large} alt="Profile" />
                    </div>
                    <div className="user-details">
                        <h2>{`${userData.name.title} ${userData.name.first} ${userData.name.last}`}</h2>
                        <p>Email: {userData.email}</p>
                        <p>Phone: {userData.phone}</p>
                        <p>Location: {`${userData.location.street.number} ${userData.location.street.name}, ${userData.location.city}, ${userData.location.state}, ${userData.location.country} ${userData.location.postcode}`}</p>
                        {/* Add more user details as needed */}
                    </div>
                    <button onClick={handleEditClick}>Edit</button>
                </>
            )}

            {isEditing && (
                <div className="edit-form">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={editedUserData.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={editedUserData.email}
                            onChange={handleInputChange}
                        />
                    </label>
                    {/* Add more editable fields as needed */}
                    <label>
                        New Profile Picture:
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </label>
                    {newProfilePicture && (
                        <div className="preview">
                            <p>New Profile Picture Preview:</p>
                            <img src={newProfilePicture} alt="New Profile" />
                        </div>
                    )}
                    <button onClick={handleCancelEdit}>Cancel</button>
                    <button onClick={handleSaveEdit}>Save</button>
                </div>
            )}

            <h2>Order History</h2>
            <ul className="order-history-list">
                {orderHistory.map((order) => (
                    <li key={order.orderId}>
                        <div className="order-info">
                            <p>Order ID: {order.orderId}</p>
                            <p>Date: {order.date}</p>
                            <p>Total: ${order.total}</p>
                        </div>
                        {/* Add more details or links to view order details */}
                    </li>
                ))}
            </ul>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmitPassword} className="password-form">
                <label>
                    Current Password:
                    <input
                        type="password"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        required
                    />
                </label>
                <label>
                    New Password:
                    <input
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        required
                    />
                </label>
                <label>
                    Confirm New Password:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                    />
                </label>
                <button type="submit">Change Password</button>
            </form>
            <h2>Manage Addresses</h2>
            <form onSubmit={handleSubmitAddress} className="address-form">
                <label>
                    Street:
                    <input
                        type="text"
                        name="street"
                        value={addressForm.street}
                        onChange={handleAddressChange}
                        required
                    />
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        value={addressForm.city}
                        onChange={handleAddressChange}
                        required
                    />
                </label>
                <label>
                    Zip Code:
                    <input
                        type="text"
                        name="zipCode"
                        value={addressForm.zipCode}
                        onChange={handleAddressChange}
                        required
                    />
                </label>
                <button type="submit">Add Address</button>
            </form>
            <ul className="address-list">
                {addresses.map((address) => (
                    <li key={address.id}>
                        <p>{`${address.street}, ${address.city}, ${address.zipCode}`}</p>
                        <button onClick={() => handleDeleteAddress(address.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Wishlist</h2>
            <ul className="wishlist">
                {wishlist.map((product) => (
                    <li key={product.id}>
                        <p>{product.name}</p>
                        <button onClick={() => handleRemoveFromWishlist(product.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;
