import React from 'react';
import {
    Link
} from 'react-router-dom';

import icon from './southbalanceLogo.png';
import Searchbar from './Searchbar';

interface ToolbarProps {
    session: string | null
}


const Toolbar: React.FC<ToolbarProps> = ({ session }) => {
    
    return (
        <div id="toolbar-container">
            {!session ? (
                <>
                    <Link to="/">
                        <img width="55px" height="55px" className="toolbar-anchor icon" src={icon} />
                    </Link>
                    <Link to="/login">
                        <h1 className="toolbar-anchor">Login</h1>
                    </Link>
                    
                    <Link to="/register">
                        <h1 className="toolbar-anchor">Register</h1>
                    </Link>
                </>
            ) :
                <>
                    <Link to="/home">
                        <img width="55px" height="55px" role="presentation" className="toolbar-anchor icon" src={icon} />
                    </Link>
                    
                    <Searchbar />
                        
                    <Link to="/cart">
                        <h1 className="toolbar-anchor">My Cart</h1>
                    </Link>

                    <Link to="/profile">
                        <h1 className="toolbar-anchor">My Profile</h1>
                    </Link>
                </>}
        </div>
    );
}

export default Toolbar;
