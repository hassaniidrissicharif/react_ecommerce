// CheckoutPage.js

import React, { useState, useEffect } from 'react';
import './CheckoutPage.css'; // Import the CSS file

const CheckoutPage = () => {
    const [products, setProducts] = useState([]);
    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        city: '',
        zipCode: '',
    });
    const [paymentDetails, setPaymentDetails] = useState({
        creditCard: '',
        expirationDate: '',
        cvv: '',
    });

    useEffect(() => {
        // Fetch product data from the API or JSON file
        fetch('https://fakestoreapi.com/products')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                return response.json();
            })
            .then((data) => setProducts(data))
            .catch((error) => console.error(error));
    }, []);
    const handleShippingChange = (e) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handlePaymentChange = (e) => {
        setPaymentDetails({
            ...paymentDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission, e.g., send data to server
    };
    const handleRemoveItem = (productId) => {
        // Logic to remove the item from the order summary
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    };

    // Calculate total price based on the products

    const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);

    // Calculate estimated delivery date (e.g., 7 days from today)
    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 7);
    const [couponCode, setCouponCode] = useState('');
    const [discountedTotal, setDiscountedTotal] = useState(0);

    // Existing code

    const handleCouponChange = (e) => {
        setCouponCode(e.target.value);
    };

    const applyCoupon = () => {
        // Implement logic to apply the coupon and calculate the discounted total
        // Update the discountedTotal state accordingly
        const coupon = 'SAMPLE25';
        const discountPercentage = 0.25; // 25% discount for the sample coupon

        // Check if the entered coupon code matches the sample coupon
        if (couponCode === coupon) {
            // Calculate the discounted total
            const originalTotal = products.reduce((total, product) => total + product.price * product.quantity, 0);
            const discountAmount = originalTotal * discountPercentage;
            const newDiscountedTotal = originalTotal - discountAmount;

            // Update the discountedTotal state
            setDiscountedTotal(newDiscountedTotal);
        } else {
            // Handle invalid coupon code
            alert('Invalid coupon code. Please try again.');
        }
    };

    return (
        <div className="checkout-page">
            <div className="order-summary">
                <h2>Order Summary</h2>
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <span>{product.name}</span>
                            <span>Quantity: {product.quantity}</span>
                            <span>${product.price * product.quantity}</span>
                            <button onClick={() => handleRemoveItem(product.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <div className="total-price">
                    <strong>Total:</strong> ${totalPrice.toFixed(2)}
                </div>
            </div>
            <div className="coupon-section">
                <h2>Coupon Code</h2>
                <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={handleCouponChange}
                />
                <button onClick={applyCoupon}>Apply Coupon</button>
            </div>


            <div className="shipping-info">
                {/* Shipping information form */}
            </div>

            <div className="payment-details">
                {/* Payment details form */}
            </div>
            {/* ... (other sections) */}
            <form onSubmit={handleFormSubmit}>
                {/* Shipping information section */}
                <div className="shipping-info">
                    <h2>Shipping Information</h2>
                    <label>
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={shippingInfo.address}
                            onChange={handleShippingChange}
                            required
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            name="city"
                            value={shippingInfo.city}
                            onChange={handleShippingChange}
                            required
                        />
                    </label>
                    <label>
                        Zip Code:
                        <input
                            type="text"
                            name="zipCode"
                            value={shippingInfo.zipCode}
                            onChange={handleShippingChange}
                            required
                        />
                    </label>
                </div>

                {/* Payment details section */}
                <div className="payment-details">
                    <h2>Payment Details</h2>
                    <label>
                        Credit Card:
                        <input
                            type="text"
                            name="creditCard"
                            value={paymentDetails.creditCard}
                            onChange={handlePaymentChange}
                            required
                        />
                    </label>
                    <label>
                        Expiration Date:
                        <input
                            type="text"
                            name="expirationDate"
                            value={paymentDetails.expirationDate}
                            onChange={handlePaymentChange}
                            required
                        />
                    </label>
                    <label>
                        CVV:
                        <input
                            type="text"
                            name="cvv"
                            value={paymentDetails.cvv}
                            onChange={handlePaymentChange}
                            required
                        />
                    </label>
                </div>

                <button type="submit">Place Order</button>
            </form>
            <form onSubmit={handleFormSubmit}>
                {/* ... (previous sections) */}

                {/* Confirmation section */}
                <div className="confirmation-section">
                    <h2>Order Confirmation</h2>
                    <div className="confirmation-summary">
                        <div>
                            <strong>Estimated Delivery Date:</strong>{' '}
                            {estimatedDeliveryDate.toLocaleDateString('en-US')}
                        </div>
                        <div>
                            <strong>Order Total:</strong> ${totalPrice.toFixed(2)}
                        </div>
                    </div>
                </div>

                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default CheckoutPage;
