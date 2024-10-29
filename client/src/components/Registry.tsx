import react, {useState, useEffect}from 'react';

import Toolbar from './toolbar/Toolbar';

import { createUser } from '../helpers/apiHelpers';
import Footer from './toolbar/Footer';

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
        <div id="registry-container" className='page'>
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
                    <button className="btn light" type="submit">Register</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}
