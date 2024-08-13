import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import logo from './images/logo.png';
import 'font-awesome/css/font-awesome.min.css';
import Category from './components/Category/Category.js';
import Item from './components/Item/Item.js';

function App() {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const restaurantImageRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (restaurantImageRef.current) {
            observer.observe(restaurantImageRef.current);
        }

        return () => {
            if (restaurantImageRef.current) {
                observer.unobserve(restaurantImageRef.current);
            }
        };
    }, []);

    const handleCategoriesLoaded = (categories) => {
        setCategories(categories);
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };

    return (
        <div className="App">
            <nav className="navbar">
                <img src={logo} className="logo" alt="Logo" />
                <div className="cart-icon">
                    <i className="fa fa-shopping-cart"></i>
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
                                <Item categoryId={selectedCategoryId} />
                            </div>
                        )}
                    </div>
                ))}
            </section>
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
