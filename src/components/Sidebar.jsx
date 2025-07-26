import React from 'react';

const Sidebar = ({ selectedProfile, setSelectedProfile, onSearchClick, onHomeClick, showSidebar, setShowSidebar }) => {
    return (
        <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
            <button className="close-sidebar-btn" onClick={() => setShowSidebar(false)}>X</button>
            {selectedProfile && (
                <div className="profile-info-sidebar">
                    <img src={selectedProfile.picture} alt={selectedProfile.name} className="profile-avatar-sidebar" />
                    <span className="profile-name-sidebar">Welcome, {selectedProfile.name}!</span>
                    <button className="switch-profile-btn-sidebar" onClick={() => setSelectedProfile(null)}>Switch Profile</button>
                </div>
            )}
            <div className="sidebar-item" onClick={() => { onHomeClick(); setShowSidebar(false); }}>Home</div>
            <div className="sidebar-item" onClick={() => { onSearchClick(); setShowSidebar(false); }}>Search</div>
        </div>
    );
};

export default Sidebar;