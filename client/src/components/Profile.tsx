import react from 'react';

import Toolbar from './Toolbar';

export default function Profile() {
    return (
        <div id="profile-container">
            <Toolbar />
            
            <div id="profile-header">
                <h1 className="hdr large" id="profile-header-text">
                    Profile
                </h1>
            </div>
            <div id="profile-body">

            </div>
        </div>
    );
}
