import React, { useState, useEffect } from 'react';

import Toolbar from './toolbar/Toolbar';
import Footer from './toolbar/Footer';
import { createPaymentInfo, createTransaction, createTransactionProduct, deleteCartItem, getCart, getUserInfo } from '../helpers/apiHelpers';

import CartProduct from './product/CartProduct';
import ShippingForm from './shoppingcart/ShippingForm';
import OrderSummary from './shoppingcart/CartOrderSummary';
import TransactionForm from './shoppingcart/Transaction';

import icon from '../img/EmptyCart.png';
import {ShoppingCartProps, ShoppingCartItem, ShippingFormObject, TransactionFormObject} from '../interfaces/shoppingcartInterface';

interface QuantitiesInterface {
    [key: string]: number
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ session }) => {

    const [cart, setCart] = useState<ShoppingCartItem[]>([]);
    const [userID, setUserID] = useState<string>('');
    const [quantities, setQuantities] = useState<QuantitiesInterface>({});
    const [transactionFormSelected, setTransactionFormSelected] = useState<boolean>(false);

    const [transactionForm, setTransactionForm] = useState<TransactionFormObject>(
        {
            card_number: '',
            exp_date: '',
            type: ''
        }
    );

    const [shippingForm, setShippingForm] = useState<ShippingFormObject>(
        {
            shipping_address: '',
            shipping_state: '',
            shipping_country: '',
            shipping_city: '',
            shipping_zip: '',
        }
    );

    const pruneCartItem = async (id: string) => {
        await deleteCartItem(userID, id);
        const findItemByID = cart.find((cartItem) => cartItem.product_id === id);
        window.location.reload();
    }

    const orderItem = async () => {
        let transactionInfo;
        let paymentInfo;

        console.log(transactionForm);
        
        paymentInfo = await createPaymentInfo(userID, transactionForm.card_number, transactionForm.exp_date, transactionForm.type)
        .catch(err => console.error(err));
        if (paymentInfo) {
            console.log(paymentInfo);
            transactionInfo = await createTransaction(paymentInfo.id, shippingForm.shipping_address, shippingForm.shipping_city, shippingForm.shipping_state, shippingForm.shipping_zip)
            .catch(err => console.error(err));

        }

        for (let i: number = 0; i < cart.length; i++) {
            const amount = quantities[cart[i].id];
            await createTransactionProduct(transactionInfo.id, cart[i].id, amount, parseFloat((parseFloat(cart[i].price) * amount).toFixed(2)))
            .catch(err => console.error(err));
        }

    }

    useEffect(() => {
        if (session) {
            getUserInfo(session)
            .then((user) => {
                getCart(user.id)
                .then((cartData) => {
                    setUserID(user.id);
                    cartData ? setCart(cartData.data.data || []) : null;
                })
            })
        } else {
            window.location.href = '/';
        }
    }, []);

    return (
        <div id="shopping-cart-container" className='page'>
            <Toolbar session={session} />
            
            <div id="shopping-cart-header">
                <h1 className="hdr large" id="shopping-cart-header-text">
                    My Cart
                </h1>
            </div>
            {cart.length > 0 ? (
                    <div id="shopping-cart-body">
                        <div id="shopping-cart-list">
                        {
                            cart.map(({ price, product_image_url, product_name, product_color, product_id }, index) => (
                                <CartProduct 
                                    productName={product_name}
                                    productPrice={price}
                                    productImageURL={product_image_url}
                                    productColor={product_color}
                                    elementIndex={index}
                                    productID={product_id}
                                    pruneCartItem={pruneCartItem}
                                    quantities={quantities}
                                    setQuantities={setQuantities}
                                />
                            ))
                        }
                    </div>
                    <div id="shopping-cart-confirm">
                        <div id="order-summary-container">
                            <OrderSummary
                                cart={cart}
                                quantities={quantities}
                             />
                        </div>
                        <div id="confirm-shipping-container">
                            {
                                !transactionFormSelected ? (
                                    <ShippingForm
                                        shippingForm={shippingForm}
                                        setShippingForm={setShippingForm}
                                    />
                                ) : (
                                    <TransactionForm
                                        setTransactionForm={setTransactionForm}
                                    />
                                )
                            }
                        </div>
                        <div id="order-summary-confirm-btn">
                            {
                                transactionFormSelected ? <button className={`btn ${transactionFormSelected && 'light'}`} id="order-back-btn" onClick={() => setTransactionFormSelected(!transactionFormSelected)}>
                                    Back to Shipping
                                </button> : <div></div>
                            }
                            <div></div>
                            <button className="btn" id="order-submit-btn" onClick={() => !transactionFormSelected ? setTransactionFormSelected(!transactionFormSelected) : orderItem()}>
                                {!transactionFormSelected ? 'To Transaction' : 'Confirm Order'}
                            </button>
                        </div>
                    </div>
                </div>
                ) : (
                    <div id="shopping-cart-empty-container">
                        <img src={icon} alt="empty shopping cart frowning." id="empty-cart-icon" />
                        <span id="shopping-cart-empty-header">
                            Your cart appears to be empty.
                        </span>
                        <span id="shopping-cart-empty">
                            Don't be shy... browse a little! There are many options to choose from. <a className="btn" href="http://127.0.0.1:8081/home">Here</a>
                        </span>
                    </div>
                )}
            <Footer />
        </div>
    );
}

export default ShoppingCart
