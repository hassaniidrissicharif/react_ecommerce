import React, { useState, useEffect } from 'react';
import './ProductListing.css'; // Import CSS file for styling
import { useCart } from './CartContext'; // Import the CartContext


const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const [sortType, setSortType] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const { dispatch } = useCart(); // Get dispatch function from CartContext


    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortChange = (event) => {
        setSortType(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterCategory(event.target.value);
    };

    // Sorting and filtering logic remains the same as before

    const sortedProducts = [...products]; // Create a copy of the products array
    if (sortType === 'price') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'popularity') {
        sortedProducts.sort((a, b) => b.popularity - a.popularity);
    } else if (sortType === 'alphabetical') {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Filtering function based on the selected category
    const filteredProducts = filterCategory
        ? sortedProducts.filter((product) => product.category === filterCategory)
        : sortedProducts;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };
    return (
        <div className="product-listing-container">
            <h2>Product Listing</h2>
            <div className="filter-container">
                <label htmlFor="categoryFilter">Filter by Category:</label>
                <select id="categoryFilter" value={filterCategory} onChange={handleFilterChange}>
                    <option value="">All Categories</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                    {/* Add more options for other categories */}
                </select>
            </div>
            <div className="sort-container">
                <label htmlFor="sortType">Sort by:</label>
                <select id="sortType" value={sortType} onChange={handleSortChange}>
                    <option value="">Select</option>
                    <option value="price">Price</option>
                    <option value="popularity">Popularity</option>
                    <option value="alphabetical">Alphabetical</option>
                </select>
            </div>
            <ul className="product-list">
                {currentProducts.map((product) => (
                    <li key={product.id} className="product-item">
                        <img src={product.image} alt={product.title} className="product-image" />
                        <h3>{product.title}</h3>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
            {/* Pagination component */}
        </div>
    );
};

export default ProductListing;
