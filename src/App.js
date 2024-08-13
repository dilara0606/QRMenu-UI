import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './images/logo.png';
import 'font-awesome/css/font-awesome.min.css';
import Category from './components/Category/Category.js';
import Item from './components/Item/Item.js';

function App() {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [cart, setCart] = useState([]);
    const [cartVisible, setCartVisible] = useState(false);

    const handleCategoriesLoaded = (categories) => {
        setCategories(categories);
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };

    const toggleCartVisibility = () => {
        setCartVisible(prev => !prev);
    };

    const addToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const totalAmount = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

    return (
        <div className="App">
            <nav className="navbar">
                <img src={logo} className="logo" alt="Logo" />
                <div className="cart-icon" onClick={toggleCartVisibility}>
                    <i className="fa fa-shopping-cart"></i>
                    {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                </div>
            </nav>
            <header className="App-header">
                <div className="header-overlay"></div>
                <h1>Welcome</h1>
                <h2>Restaurant</h2>
                <div className="scroll-down" onClick={() => window.scrollTo({ top: document.querySelector('.categories').offsetTop, behavior: 'smooth' })}>
                    &#x2193;
                </div>
            </header>
            
            <section className="categories">
                {categories.map((category) => (
                    <div className="menu-item" key={category.id} onClick={() => handleCategoryClick(category.id)}>
                        <div className="category-icon" style={{ backgroundImage: `url(${category.imageUrl})` }}></div>
                        <div className="category-content">
                            <h4>{category.name}</h4>
                        </div>
                        {selectedCategoryId === category.id && (
                            <div className='category-products'>
                                <Item categoryId={selectedCategoryId} onProductAdd={addToCart} />
                            </div>
                        )}
                    </div>
                ))}
            </section>
            
            {cartVisible && (
                <div className="cart-modal">
                    <h2>Cart</h2>
                    {cart.length > 0 ? (
                        <ul>
                            {cart.map((item) => (
                                <li key={item.id}>
                                    <img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px' }} />
                                    <span>{item.name} - ₺{item.price.toFixed(2)}</span>
                                    <button onClick={() => removeFromCart(item.id)} className="remove-button">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                    <p>Total: ₺{totalAmount}</p>
                    <button onClick={toggleCartVisibility} className="close-cart-button">Close</button>
                </div>
            )}

            <footer>
                <div className="social-media">
                    <a href="#facebook" className="social-icon"><i className="fa fa-facebook"></i></a>
                    <a href="#twitter" className="social-icon"><i className="fa fa-twitter"></i></a>
                    <a href="#instagram" className="social-icon"><i className="fa fa-instagram"></i></a>
                    <a href="#linkedin" className="social-icon"><i className="fa fa-linkedin"></i></a>
                </div>
                <div className="contact-info">
                    <p>Location: 123 Main Street, City, Country</p>
                    <p>Phone: (123) 456-7890</p>
                    <p>Email: info@restaurant.com</p>
                </div>
            </footer>

            <Category onCategoriesLoaded={handleCategoriesLoaded} />
        </div>
    );
}

export default App;
