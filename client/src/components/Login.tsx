import react from 'react';

import Toolbar from './Toolbar';

export default function Login() {
    return (
        <div id="login-container">
            <Toolbar />
            <div id="login-window">
                <div id="login-header">
                    <h1 className="hdr large" id="login-header-text">
                        Login
                    </h1>
                </div>
                <br />
                //! TODO: add login information functionality 
                <div id="login-body">
                    <label className="label-st" id="login-username">Username:</label>
                    <input type="text" />
                    <label className="label-st" id="login-password">Password:</label>
                    <input type="text" />
                    <button>Login</button>
                </div>
            </div>
        </div>
    );
}
