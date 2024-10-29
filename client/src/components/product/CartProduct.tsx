import React, { useState } from 'react';
import { deleteCartItem } from '../../helpers/apiHelpers';

interface CartProductProps {
    productName: string
    productImageURL: string
    productPrice: string
    productColor: string
    elementIndex: number
    productID: string
    pruneCartItem: Function
    quantities: {[key: string]: number}
    setQuantities: Function
}

const CartProduct: React.FC<CartProductProps> = ({ productName, productImageURL, productPrice, productColor, elementIndex, productID, pruneCartItem, quantities, setQuantities}) => {

    const [spinner, setSpinner] = useState<number>(1);

    const handleSpinner = (value: number) => {
        if (typeof value === "number") {

            const quantity = Math.max(1, value);

            setQuantities(
                {...quantities,
                    [productID]: quantity,
                }
            )

            setSpinner(quantity);
        } else {
            setSpinner(0)
        }
    }

    const handleItemDelete = () => {
        pruneCartItem(productID);
    }

    return (
        <>
            <div className="cart-item-container">
                <div className="cart-item-header">
                    <img src={productImageURL} alt="cart item image" className="cart-item-image" />
                </div>
                <div className="cart-item-body">
                    <div className="cart-item-body-header">
                        <span className="cart-item-header-txt">
                        {productName}
                        </span>
                    </div>
                    <div className="cart-item-spinner">
                        <button className="spinner-increase btn" onClick={() => handleSpinner(spinner + 1)}>+</button>
                        <input className="spinner-text" value={spinner || ''} onChange={event => handleSpinner(parseInt(event.target.value))} />
                        <button className="spinner-decrease btn" onClick={() => handleSpinner(spinner - 1)}>-</button>
                    </div>
                </div>
                <div className="item-column-3">
                    <button className="delete-cart-item" onClick={handleItemDelete}>
                        Delete
                    </button>
                    <div className="shopping-cart-price">
                        <span className="price thin">$</span>
                        <span className="price thin">{productPrice}</span>
                    </div>
                </div>
            </div>
            <hr className="line" />
        </>
    );
}

export default CartProduct;
