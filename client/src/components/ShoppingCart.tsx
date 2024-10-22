import React from 'react';

import Toolbar from './toolbar/Toolbar';

interface ShoppingCartProps {
    session: string | null
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ session }) => {
    return (
        <div id="shopping-cart-container">
            <Toolbar session={session} />
            
            <div id="shopping-cart-header">
                <h1 className="hdr large" id="shopping-cart-header-text">
                    My Cart
                </h1>
            </div>
            <div id="shopping-cart-body">Stuff...</div>
        </div>
    );
}

export default ShoppingCart
