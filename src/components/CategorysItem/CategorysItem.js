import React, { useState, useEffect } from 'react';

function CategorysItem({ categoryId, onProductsLoaded }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let isMounted = true;

        fetch(`http://localhost:8088/api/v1/admin/all-category/${categoryId}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(
            (result) => {
                if (isMounted) {
                    setIsLoaded(true);
                    setProducts(result);
                    if (onProductsLoaded) {
                        onProductsLoaded(result);
                        console.log(result);
                    }
                }
            },
            (error) => {
                if (isMounted) {
                    setIsLoaded(true);
                    setError(error);
                    console.log(error);
                }
            }
        );

        return () => {
            isMounted = false;
        };
    }, [categoryId, onProductsLoaded]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="products">
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <div className="product-image" style={{ backgroundImage: `url(${product.imageUrl})` }}></div>
                        <div className="product-details">
                            <h5>{product.name}</h5>
                            <p>{product.description}</p>
                            <p className="product-price">₺{product.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default CategorysItem;
