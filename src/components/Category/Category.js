import React, { useState, useEffect } from 'react';

function Category({ onCategoriesLoaded }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        let isMounted = true;

        fetch('http://localhost:8088/api/v1/menu/get-active-menu', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(
            (result) => {
                if (isMounted) {
                    setIsLoaded(true);
                    // Extract the list of categoryDtos from menusCategoryDtoList
                    const categories = result.menusCategoryDtoList.map(menuCategory => menuCategory.categoryDto);
                    setCategoryList(categories);
                    if (onCategoriesLoaded) {
                        onCategoriesLoaded(categories);
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
