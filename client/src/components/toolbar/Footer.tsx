import React from 'react';
import {
    Link
} from 'react-router-dom';

import icon from './southbalanceLogo.png';
import Searchbar from './Searchbar';


const Footer: React.FC = () => {
    
    return (
        <footer id="footer-container">
            <div id="footer-header">
                <h4 id="footer-text">{'South Balance Inc 2024. © All rights reserved.'}</h4>
            </div>
        </footer>
    );
}

export default Footer;
