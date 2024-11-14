import React from 'react';

import { logout } from '../../helpers/apiHelpers';

import { motion } from 'framer-motion';

const ProfileDrawer = ({}) => {

    return (
        <motion.div id="profile-drawer-container">
            <div id="profile-drawer-options">
                <div className="line" />
                <button type="button" className="btn light no-margin">
                    Reset Password
                </button>
                <div className="line" />
                <button type="button" onClick={logout} className="btn light no-margin">
                    Sign Out
                </button>
            </div>
        </motion.div>
    )
};

export default ProfileDrawer;