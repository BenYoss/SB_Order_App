import react from 'react';
import {
    Link
} from 'react-router-dom';

export default function Toolbar() {
    return (
        <div id="toolbar-container">
            
            <Link to="/login">
                <h1 id="toolbar-anchor">Login</h1>
            </Link>
            
            <Link to="/register">
              <h1 id="toolbar-anchor">Register</h1>
            </Link>
        </div>
    );
}
