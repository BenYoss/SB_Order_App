import React, { useState, useEffect } from 'react';

interface SearchbarInterface {

}

interface SearchbarInterfaceQuery {
    filter: string,
    query: string
}

const Searchbar: React.FC<SearchbarInterface> = ({  }) => {

    const [filter, setFilter] = useState('');

    const [query, setQuery] = useState('');

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
                    <option value="Water Bottle">Water Bottle</option>
                    <option value="Electronics">Electronics</option>
                </select>
                <br />
                <input type="text" value={query} placeholder={'search for products...'}onChange={handleQueryChange} id="searchbar" />
                <button type="submit" id="searchbar-form-submit">Search</button>
            </form>
        </div>
    );
}

export default Searchbar;
