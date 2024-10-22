import react, {useState, useEffect}from 'react';

import Toolbar from './toolbar/Toolbar';

import { createUser } from '../helpers/apiHelpers';

interface UserInterface {
    username: string,
    email: string,
    phone: string,
    password: string,
    confirm: string,
    street: string,
    city: string,
    zip: string,
    country: string,
    credit: string,
    card: string,
    creditType: string
};


export default function Registry() {

    const [userInformation, setUserInformation] = useState<UserInterface>(
        {
            "username": '',
            "email": '',
            "phone": '',
            "password": '',
            "confirm": '',
            "street": '',
            "city": '',
            "zip": '',
            "country": '',
            "credit": '',
            "card": '',
            "creditType": ''
        }
    );

    const handleUserInformation = (_event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = _event.target;
        
        setUserInformation(
           (prevInfo: UserInterface) => {
                return {
                    ...prevInfo,
                    [id]: value,
                }
           });
    };

    const handleUserSubmission = async (_event: React.FormEvent<HTMLFormElement>) => {
        _event.preventDefault();

        type ElementType = 'username' 
        | 'email' 
        | 'phone' 
        | 'password' 
        | 'confirm' 
        | 'street' 
        | 'city' 
        | 'zip' 
        | 'country' 
        | 'credit' 
        | 'card' 
        | 'creditType'
        
        let element: ElementType;
        
        for (element in userInformation) {
            if (String(userInformation[element]).length == 0) {
                alert("Please fill in all form elements.");
                return;
            }
        }
        
        await createUser(userInformation)
        .then(() => {
            window.location.href = '/login';
        })
        .catch(err => console.error(err));
    }

    /**==============================================
     * *           FORM INPUT INFORMATION
     *   
     *   username, email, phone, password, confirm, street, city, zip, country
, credit, expiry, type
     //! TODO: add registry information functionality 
     *
     *=============================================**/
    return (
        <div id="registry-container">
            <Toolbar session={null} />
            
            <div id="registry-window">
                <div id="registry-header">
                    <h1 className="hdr large" id="registry-header-text">
                        Register
                    </h1>
                </div>
                <form onSubmit={handleUserSubmission} id="registry-body">
                
                    <label className="label-st" id="username">Username:</label>
                    <input type="text" id="username" onChange={handleUserInformation} value={userInformation.username}/>
                    <label className="label-st" id="email">Email:</label>
                    <input type="text" id="email" onChange={handleUserInformation} value={userInformation.email}/>
                    <label className="label-st" id="phone">Phone:</label>
                    <input type="text" id="phone" onChange={handleUserInformation} value={userInformation.phone}/>
                    <label className="label-st" id="password">Password:</label>
                    <input type="text" id="password" onChange={handleUserInformation} value={userInformation.password}/>
                    <label className="label-st" id="confirm-password">Confirm Password:</label>
                    <input type="text" id="confirm" onChange={handleUserInformation} value={userInformation.confirm}/>
                    <label className="label-st" id="street">Street:</label>
                    <input type="text" id="street" onChange={handleUserInformation} value={userInformation.street}/>
                    <label className="label-st" id="city">City:</label>
                    <input type="text" id="city" onChange={handleUserInformation} value={userInformation.city}/>
                    <label className="label-st" id="zip">Zip:</label>
                    <input type="text" id="zip" onChange={handleUserInformation} value={userInformation.zip}/>
                    <label className="label-st" id="country">Country:</label>
                    <input type="text" id="country" onChange={handleUserInformation} value={userInformation.country}/>
                    <label className="label-st" id="credit-card-number">Credit Card Number:</label>
                    <input type="text" id="credit" onChange={handleUserInformation} value={userInformation.credit}/>
                    <label className="label-st" id="card-expiry">Expiration Date:</label>
                    <input type="text" id="card" onChange={handleUserInformation} value={userInformation.card}/>
                    <label className="label-st" id="credit-card-type">Type:</label>
                    <input type="text" id="creditType" onChange={handleUserInformation} value={userInformation.creditType}/>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}
