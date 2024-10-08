import react from 'react';

import Toolbar from './Toolbar';

export default function HomePage() {
    return (
        <div id="homepage-container">
            <Toolbar />
            
            <div id="homepage-header">
                <h1 className="hdr small" id="homepage-header-text">
                    Welcome!
                </h1>
            </div>
            <div id="homepage-body"></div>
        </div>
    );
}
