import React from 'react';

import {
    Link
} from 'react-router-dom';

interface ProductSmallProps {
    productID: string,
    productName: string,
    productImageURL: string,
    productPrice: string
}

const ProductSmall: React.FC<ProductSmallProps> = ({ productID, productName, productImageURL, productPrice }) => {
    return (
        <div className="product-container">
            <div className="product-image">
                <img src={productImageURL} alt="Image of product" className="product-icon" />
            </div>
            <div className="product-header">
                <Link to={`/item?id=${productID}`}>
                    <span className="product-name">
                        {productName}
                    </span>
                </Link>
            </div>
            <div className="product-footer">
                <span className="product-price">
                    Price: {`$${productPrice}`}
                </span>
            </div>
        </div>
    )
}

export default ProductSmall;
