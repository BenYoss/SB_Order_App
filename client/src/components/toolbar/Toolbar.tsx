import React, { useState } from 'react';
import {
    Link
} from 'react-router-dom';

import icon from '../../img/southbalanceLogo.png';
import Searchbar from './Searchbar';

import ProfileDrawer from '../profile/ProfileDrawer';

interface ToolbarProps {
    session: string | null
}

const productCategories = [];

const Toolbar: React.FC<ToolbarProps> = ({ session }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    return (
        <div id="toolbar-container">
                    {
                        isOpen && (
                            <ProfileDrawer />
                        )
                    }
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

                    <h1 className="toolbar-anchor" onClick={() => setIsOpen(!isOpen)}>My Profile</h1>
                </>}
        </div>
    );
}

export default Toolbar;
