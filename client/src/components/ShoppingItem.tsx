import react from 'react';

import Toolbar from './Toolbar';

export default function ShoppingItem() {
    return (
        <div id="shopping-item-container">
            <Toolbar />
            
            <div id="shopping-item-header">
                <h1 className="hdr large" id="shopping-item-header-text">
                    Item information
                </h1>
            </div>
            <div id="shopping-item-body">Stuff...</div>
        </div>
    );
}
