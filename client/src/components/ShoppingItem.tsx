import React, { useState, useEffect } from 'react';

import Toolbar from './toolbar/Toolbar';

import { getProductByID } from '../helpers/apiHelpers'; 

interface ShoppingItemProps {
    session: string | null
}

interface ShoppingItemProduct {
    id: string
    product_name: string
    product_category: string
    product_description: string
    product_image_url: string
    product_color: string
    price: string
    quantity: string
    last_shipment: string,
    last_modified: string,
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({ session }) => {
    const [product, setProduct] = useState<ShoppingItemProduct>({
        id: '',
        product_name: '',
        product_category: '',
        product_description: '',
        product_image_url: '',
        product_color: '',
        price: '',
        quantity: '',
        last_shipment: '',
        last_modified: ''
    });



    useEffect(() => {

        const id = window.location.href.split('=')[1];
        
        if (!product.id) {
            getProductByID(id)
            .then((data) => {
                setProduct(data);
            })
        }
    }, [product]);

    return (
        <div id="shopping-item-container">
            <Toolbar session={session} />
            
            <div id="shopping-item-header">
                <div id="shopping-item-header-image">
                    <img src={product.product_image_url} width="10%" height="10%" alt="Product icon" id="shopping-item-icon" />
                </div>
                <div id="shopping-item-header-block">
                    <h1 className="hdr large" id="shopping-item-header-text">
                        {product.product_name}
                    </h1>
                    <span id="shopping-item-description">
                        {product.product_description}
                    </span>
                </div>
            </div>
            <div id="shopping-item-body">
            </div>
        </div>
    );
}

export default ShoppingItem;
