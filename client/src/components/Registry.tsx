import react from 'react';

import Toolbar from './Toolbar';

export default function Registry() {
    return (
        <div id="registry-container">
            <Toolbar />
            
            <div id="registry-window">
                <div id="registry-header">
                    <h1 className="hdr large" id="registry-header-text">
                        Register
                    </h1>
                </div>
                /**==============================================
                 * *           FORM INPUT INFORMATION
                 *   
                 *   username, email, phone, password, confirm, street, city, zip, country
, credit, expiry, type
                 //! TODO: add registry information functionality 
                 *
                 *=============================================**/
                <div id="registry-body">
                    <label className="label-st" id="username">Username:</label>
                    <input type="text" />
                    <label className="label-st" id="email">Email:</label>
                    <input type="text" />
                    <label className="label-st" id="phone">Phone:</label>
                    <input type="text" />
                    <label className="label-st" id="password">Password:</label>
                    <input type="text" />
                    <label className="label-st" id="confirm-password">Confirm Password:</label>
                    <input type="text" />
                    <label className="label-st" id="street">Street:</label>
                    <input type="text" />
                    <label className="label-st" id="city">City:</label>
                    <input type="text" />
                    <label className="label-st" id="zip">Zip:</label>
                    <input type="text" />
                    <label className="label-st" id="country">Country:</label>
                    <input type="text" />
                    <label className="label-st" id="credit-card-number">Credit Card Number:</label>
                    <input type="text" />
                    <label className="label-st" id="card-expiry">Expiration Date:</label>
                    <input type="text" />
                    <label className="label-st" id="credit-card-type">Type:</label>
                    <input type="text" />
                    <button>Register</button>
                </div>
            </div>
        </div>
    );
}
