import react from 'react';

import Toolbar from './Toolbar';

export default function ShoppingList() {
    return (
        <div id="shopping-list-container">
            <Toolbar />
            
            <div id="shopping-list-header">
                <h1 className="hdr large" id="shopping-list-header-text">
                    Shopping List
                </h1>
            </div>
            <div id="shopping-list-body"> List of item information....</div>
        </div>
    );
}