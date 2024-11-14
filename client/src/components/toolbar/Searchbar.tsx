import React, { useState, useEffect } from 'react';

import { getProductCategories } from '../../helpers/apiHelpers';


interface SearchbarInterface {

}

interface SearchbarInterfaceQuery {
    filter: string,
    query: string
}

const Searchbar: React.FC<SearchbarInterface> = ({  }) => {

    const [filter, setFilter] = useState('');

    const [query, setQuery] = useState('');

    const [productCategories, setProductCategories] = useState<void | string[]>([]);

    useEffect(() => {
        if (productCategories && !productCategories.length) {
            getProductCategories().then((data) => {
                setProductCategories(data);
            });
        }
    }, []);

    const handleQueryChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
        const value = _event.target.value;

        setQuery(value);
    }

    const handleFilterChange = (_event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = _event.target.value;

        setFilter(value);
    }

    const submitQuery = (_event: React.ChangeEvent<HTMLFormElement>) => {
        _event.preventDefault();

        // Send a object that contains an array of filters
        window.location.href = `/browse?query=${query}&filter=${filter}`;
    }

    return (
        <div id="searchbar-container">
            <form onSubmit={submitQuery} id="searchbar-form">
                <select id="searchbar-dropdown" onChange={handleFilterChange}>
                    <option value="">Filters</option>
                    {
                        productCategories && productCategories.length > 0 ? productCategories.map((element) => (
                            <option value={element}>{element}</option>
                        )) : null
                    }
                </select>
                <br />
                <input type="text" value={query} placeholder={'search for products...'}onChange={handleQueryChange} id="searchbar" />
                <button type="submit" id="searchbar-form-submit">Search</button>
            </form>
        </div>
    );
}

export default Searchbar;
