import react from 'react';

import Toolbar from './toolbar/Toolbar';
import Footer from './toolbar/Footer';

export default function LandingPage() {
    return (
        <div className="page" id="landing-container">
            <Toolbar session={null} />
            
            <div id="landing-header">
                <h1 className="hdr giant" id="landing-header-text">
                    Have Products Delivered
                    <span className="hdr giant emphasis" id="landing-header-emphasis">{' Globally '}</span>
                    <span className="landing-header-text-diag">
                        In Passionate, 
                    </span>
                    <span className="landing-header-text-diag x2">
                        Dedicated,
                    </span> 
                    <span className="landing-header-text-diag x3">
                        and Talented Hands.
                    </span>
                </h1>
            </div>
            <div id="landing-body"></div>
            <Footer />
        </div>
    );
}
