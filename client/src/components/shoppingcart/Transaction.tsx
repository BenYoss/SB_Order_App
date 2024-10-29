import React, { useState, useEffect } from 'react';

import { TransactionFormObject } from '../../interfaces/shoppingcartInterface';

interface TransactionFormInterface {
    setTransactionForm: Function
}

const TransactionForm: React.FC<TransactionFormInterface> = ({ setTransactionForm }) => {

    const handleTransactionChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = _event.target;

        setTransactionForm(
            (prevInfo: TransactionFormObject) => {
                return {
                    ...prevInfo,
                    [id]: value
                }
            }
        );
    };

    return (
        <div id="transaction-form-container">
            <div id="transaction-form-header">
                <span>Transaction Information</span>
            </div>
            <div id="transaction-form-body">
                <div className="form-element">
                    <label htmlFor="" className="label-light" id="card_number_label">Card Number:</label>
                    <input type="text" onChange={handleTransactionChange} id="card_number" />
                </div>
                
                <div className="form-element">
                    <label htmlFor="" className="label-light" id="address">Card Type:</label>
                    <input type="text" onChange={handleTransactionChange} id="type" />
                </div>
                
                <div className="form-element">
                    <label htmlFor="" className="label-light" id="exp_date_label">Expiry:</label>
                    <input type="text" onChange={handleTransactionChange} id="exp_date" />
                </div>
            </div>
        </div>
    );
}

export default TransactionForm;
