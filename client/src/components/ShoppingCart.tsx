import react from 'react';

import Toolbar from './Toolbar';

export default function ShoppingCart() {
    return (
        <div id="shopping-cart-container">
            <Toolbar />
            
            <div id="shopping-cart-header">
                <h1 className="hdr large" id="shopping-cart-header-text">
                    My Cart
                </h1>
            </div>
            <div id="shopping-cart-body">Stuff...</div>
        </div>
    );
}
