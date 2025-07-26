import React from 'react';

const CreateProfile = ({ addProfile, setShowCreateProfile }) => (
    <div className="create-profile-container">
        <h1 className="create-profile-title">Create Profile</h1>
        <input
            type="text"
            placeholder="Profile Name"
            className="profile-name-input"
            onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim() !== '') {
                    addProfile(e.target.value.trim());
                }
            }}
        />
        <button className="create-profile-btn" onClick={() => {
            const input = document.querySelector('.profile-name-input');
            if (input.value.trim() !== '') {
                addProfile(input.value.trim());
            }
        }}>
            Create
        </button>
        <button className="cancel-create-profile-btn" onClick={() => setShowCreateProfile(false)}>
            Cancel
        </button>
    </div>
);

export default CreateProfile;