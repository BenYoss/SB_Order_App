import React from 'react';

import Toolbar from './toolbar/Toolbar';

interface ProfileProps {
    session: string | null
}

const Profile: React.FC<ProfileProps> = ({ session }) => {
    return (
        <div id="profile-container">
            <Toolbar session={session} />
            
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

export default Profile;
