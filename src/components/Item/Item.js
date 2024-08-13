import React, { useState, useEffect } from 'react';

function Item({ categoryId, onProductsLoaded }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let isMounted = true;

        fetch(`http://localhost:8088/api/v1/menu/get-active-menu`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(
            (result) => {
                if (isMounted) {
                    setIsLoaded(true);
                    // Find the category matching the given categoryId
                    const category = result.menusCategoryDtoList.find(menuCategory => menuCategory.categoryDto.id === categoryId);
                    // Extract the products from the category's item DTOs
                    const items = category ? category.categoryDto.categoriesItemDtoList.map(item => item.itemDto) : [];
                    setProducts(items);
                    if (onProductsLoaded) {
                        onProductsLoaded(items);
                        console.log(items);
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

export default Item;
