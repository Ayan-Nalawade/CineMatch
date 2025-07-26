import React from 'react';
import { motion } from 'framer-motion';

const ProfileSelection = ({ profiles, handleProfileSelect, setShowCreateProfile, deleteProfile }) => (
    <div className="profile-selection-container">
        <h1 className="profile-selection-title">Who's watching?</h1>
        <div className="profiles-grid">
            {profiles.map(profile => (
                <div key={profile.id} className="profile-item">
                    <motion.img
                        src={profile.picture}
                        alt={profile.name}
                        className="profile-avatar"
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleProfileSelect(profile)}
                    />
                    <span className="profile-name">{profile.name}</span>
                    {!profile.unremovable && (
                        <button
                            className="delete-profile-btn"
                            onClick={() => deleteProfile(profile.id)}
                        >
                            X
                        </button>
                    )}
                </div>
            ))}
            <div className="profile-item add-profile-item" onClick={() => setShowCreateProfile(true)}>
                <div className="add-profile-icon">+</div>
                <span className="profile-name">Add Profile</span>
            </div>
        </div>
    </div>
);

export default ProfileSelection;