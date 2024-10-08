import react from 'react';

import Toolbar from './Toolbar';

export default function LandingPage() {
    return (
        <div id="landing-container">
            <Toolbar />
            
            <div id="landing-header">
                <h1 className="hdr large" id="landing-header-text">
                    Have Products Delivered 
                    <span className="hdr large emphasis">Globally</span> 
                    In Passionate, Dedicated, and Talented Hands.
                </h1>
            </div>
            <div id="landing-body"></div>
        </div>
    );
}
