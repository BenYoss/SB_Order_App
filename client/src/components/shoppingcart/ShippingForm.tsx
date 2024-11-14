import React, { useState, useEffect } from 'react';

import { ShippingFormObject } from '../../interfaces/shoppingcartInterface';

interface ShippingFormInterface {
    shippingForm: ShippingFormObject
    setShippingForm: Function
}

const ShippingForm: React.FC<ShippingFormInterface> = ({ setShippingForm }) => {

    const handleShippingChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = _event.target;

        setShippingForm(
            (prevInfo: ShippingFormObject) => {
                return {
                    ...prevInfo,
                    [id]: value
                }
            }
        );
    };

    return (
        <div id="shipping-form-container">
            <div id="shipping-form-header">
                <span>Shipping Information</span>
            </div>
            <div id="shipping-form-body">
                <div className="form-element">
                    <label htmlFor="" className="label-light" id="address">Address:</label>
                    <input className="form-input large" type="text" onChange={handleShippingChange} id="shipping_address" />
                </div>
                
                <div className="form-element">
                    <label htmlFor="" className="label-light" id="address">Country:</label>
                    <input className="form-input large" type="text" onChange={handleShippingChange} id="shipping_country" />
                </div>
                
                <div className="form-element">
                    <label htmlFor="" className="label-light" id="address">State:</label>
                    <input className="form-input large" type="text" onChange={handleShippingChange} id="shipping_state" />
                </div>
                
                <div className="form-element">
                    <label htmlFor="" className="label-light" id="address">City:</label>
                    <input className="form-input large" type="text" onChange={handleShippingChange} id="shipping_city" />
                </div>
                
                <div className="form-element">
                    <label htmlFor="" className="label-light" id="address">Zip:</label>
                    <input type="text" className="form-input large" onChange={handleShippingChange} id="shipping_zip" />
                </div>
            </div>
        </div>
    );
}

export default ShippingForm;
