import React, { useState, useEffect } from 'react';

function Category({ onCategoriesLoaded }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        // İstek yapılmadan önceki temizliği kontrol et
        let isMounted = true;

        fetch('http://localhost:8088/api/v1/admin/category/categories', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(
            (result) => {
                if (isMounted) {
                    setIsLoaded(true);
                    setCategoryList(result);
                    if (onCategoriesLoaded) {
                        onCategoriesLoaded(result);
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

        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, [onCategoriesLoaded]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
}

export default Category;
