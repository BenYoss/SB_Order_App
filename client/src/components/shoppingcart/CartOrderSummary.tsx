import React, { useState, useEffect } from 'react';

import {ShoppingCartItem} from '../../interfaces/shoppingcartInterface';

interface OrderInterface {
    product_name: string
    product_quantity: number
    product_price: number
    product_total: number
}

interface OrderSummaryInterface {
    cart: ShoppingCartItem[]
    quantities: {[key: string]: number}
}

const OrderSummary: React.FC<OrderSummaryInterface> = ({ cart, quantities }) => {
    const [orders, setOrder] = useState<OrderInterface[]>(
        []
    );

    const [sumTotal, setSumTotal] = useState(0.00);

    useEffect(() => {
        let totalSum = 0.00;
        setOrder(
            cart.map((element: ShoppingCartItem, index: number) => {
                
                const totalAmount = parseFloat((parseFloat(element.price) * (quantities[element.product_id] || 1)).toFixed(2));

                totalSum = parseFloat((totalSum + totalAmount).toFixed(2));

                const result: OrderInterface = {
                    product_name: element.product_name,
                    product_quantity: quantities[element.product_id],
                    product_price: parseFloat(element.price),
                    product_total: totalAmount
                }
                return result;
            })
        )
        setSumTotal(totalSum);
    }, [quantities]);

    return (
        <div id="order-summary-container">
            <div id="shipping-form-header">
                <span>Order Summary</span>
            </div>
            <div id="order-summary-body">
                {
                    orders.map(({ product_name, product_price, product_quantity, product_total }) => {
                        return (
                        <>
                        <div className="summary-element">
                            <span className="summary-name">
                                name: <b>{product_name}</b>
                            </span>
                            <span className="summary-price">
                                unit price: ${ product_price }
                            </span>
                            <span className="summary-quantity">
                                { `*` }
                            </span>
                            <span className="summary-quantity">
                                { ` amount: ${product_quantity || 1}` }
                            </span>
                            <span className="summary-quantity">
                                { `=` }
                            </span>
                            <span className="summary-element-total">
                                { ` unit total: $${product_total}`}
                            </span>
                            </div>
                            <div className="line" />
                        </>
                    )})
                }
            </div>
            <div id="order-summary-footer">
                <span className="order-summary-total">
                    Total:
                </span>
                <span className="order-summary-total">
                    ${sumTotal}
                </span>
            </div>
        </div>
    );
}

export default OrderSummary;