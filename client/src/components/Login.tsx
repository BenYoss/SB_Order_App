import React, { useState, useEffect } from 'react';

import Toolbar from './toolbar/Toolbar';

import { decryptPassword } from '../helpers/apiHelpers';

import { LoginInterface } from '../interfaces/loginInterface';
import { ErrorInterface } from '../interfaces/errorInterface';
import { AnimatePresence } from 'framer-motion';

import Footer from './toolbar/Footer';
import Modal from './styleComponents/Modal';

interface LoginProps {
    session: string | null
}

const Login: React.FC<LoginProps> = ({ session }) => {
    const [exited, setExited] = useState<boolean>(false);

    if (session) {
        window.location.href = '/home';
    }

    const [loginInfo, setloginInfo] = useState<LoginInterface>({
        username: '',
        password: ''
    });

    const [error, setError] = useState<ErrorInterface>({
        errorName: '',
        errorDescription: '',
        errorType: ''
    });
    
    useEffect(() => {
        if (exited) {
            setExited(false);
            setError({
                errorName: '',
                errorDescription: '',
                errorType: ''
            });
        }
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
                setError({
                    errorName: "Login Failed",
                    errorDescription: "Please enter username and password to log in.",
                    errorType: "error"
                });
                return;
            }
        }

        await decryptPassword(loginInfo)
        .then((bool) => {
            if (bool) {
                window.location.href = "/home";
            } else {
                setError({
                    errorName: "Login Failed",
                    errorDescription: "Username or password is invalid.",
                    errorType: "error"
                })
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <div id="login-container" className="page">
            <Toolbar session={ session } />
            <AnimatePresence>
                {
                    error.errorDescription.length && !exited ? (
                        <Modal 
                        title={error.errorName}
                        variant="urgent"
                        body={{
                            header: null,
                            text: `${error.errorDescription}`,
                            buttonRoute: null,
                            inputRequired: false,
                            inputHandler: null,
                            inputResult: false,
                        }}
                        setExited={setExited}
                        />
                    ) : null
                }
            </AnimatePresence>
            <div id="login-window">
                <div id="login-header">
                    <h1 className="hdr large inverse" id="login-header-text">
                        Login to South Balance
                    </h1>
                </div>
                <form onSubmit={handleLoginSubmit} id="login-body">
                    <input className="form-input" placeholder="username"type="text" id="username" onChange={handleLoginFormUpdate} value={loginInfo.username} />
                    <input className="form-input" placeholder="password"type="password" id="password" onChange={handleLoginFormUpdate} value={loginInfo.password} />
                    <button className="btn light" type="submit">Login</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
