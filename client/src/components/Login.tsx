import React, { useState, useEffect } from 'react';

import Toolbar from './toolbar/Toolbar';

import { decryptPassword } from '../helpers/apiHelpers';

import { LoginInterface } from '../interfaces/loginInterface';
import Footer from './toolbar/Footer';

interface LoginProps {
    session: string | null
}

const Login: React.FC<LoginProps> = ({ session }) => {
    
    if (session) {
        window.location.href = '/home';
    }

    const [loginInfo, setloginInfo] = useState<LoginInterface>({
        username: '',
        password: ''
    });

    const handleLoginFormUpdate = async (_event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = _event.target;

        setloginInfo(
            (prevInfo: LoginInterface) => {
                return {
                    ...prevInfo,
                    [id]: value,
                }
            }
        );
    };

    const handleLoginSubmit = async (_event: React.FormEvent<HTMLFormElement>) => {
        _event.preventDefault();

        type ElementType = 'username' | 'password';

        let element: ElementType;

        for (element in loginInfo) {
            if (String(loginInfo[element]).length == 0) {
                alert(`Please enter ${element} to login.`);
                return;
            }
        }

        await decryptPassword(loginInfo)
        .then((bool) => {
            if (bool) {
                window.location.href = "/home";
            } else {
                alert("Invalid Login, please try again");
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <div id="login-container" className="page">
            <Toolbar session={ session } />
            <div id="login-window">
                <div id="login-header">
                    <h1 className="hdr large" id="login-header-text">
                        Login to South Balance
                    </h1>
                </div>
                <br />
                {/* #! TODO: encrypt login information in Base64  */}
                <form onSubmit={handleLoginSubmit} id="login-body">
                    <label className="label-st" id="login-username">Username:</label>
                    <input type="text" id="username" onChange={handleLoginFormUpdate} value={loginInfo.username} />
                    <label className="label-st" id="login-password">Password:</label>
                    <input type="password" id="password" onChange={handleLoginFormUpdate} value={loginInfo.password} />
                    <button className="btn light" type="submit">Login</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
