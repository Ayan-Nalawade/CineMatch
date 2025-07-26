import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import extracted components
import ProfileSelection from './components/ProfileSelection';
import CreateProfile from './components/CreateProfile';
import Sidebar from './components/Sidebar';
import SearchOverlay from './components/SearchOverlay';
import MovieSuggestions from './components/MovieSuggestions';
import HomeContent from './components/HomeContent';

// Helper function to generate random profile pictures
const generateRandomProfilePicture = () => {
    const randomId = Math.floor(Math.random() * 1000); // A random number for unique images
    return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${randomId}&size=128`;
};

function App() {
    const [profiles, setProfiles] = useState(() => {
        const savedProfiles = JSON.parse(localStorage.getItem('netflixProfiles')) || [];
        // Filter out any existing 'admin' profiles to prevent duplicates
        const filteredProfiles = savedProfiles.filter(profile => profile.name !== 'admin');
        // Always add the canonical 'admin' profile as the first element
        const adminProfile = { id: 'admin', name: 'admin', picture: generateRandomProfilePicture(), unremovable: true };
        return [adminProfile, ...filteredProfiles];
    });
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [showCreateProfile, setShowCreateProfile] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [showSearchOverlay, setShowSearchOverlay] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        localStorage.setItem('netflixProfiles', JSON.stringify(profiles));
    }, [profiles]);

    const addProfile = (profileName) => {
        const newProfile = {
            id: Date.now().toString(), // Unique ID
            name: profileName,
            picture: generateRandomProfilePicture(),
            unremovable: false,
        };
        setProfiles(prevProfiles => [...prevProfiles, newProfile]);
        setShowCreateProfile(false); // Hide create profile screen after creation
    };

    const deleteProfile = (profileId) => {
        setProfiles(prevProfiles => prevProfiles.filter(profile => profile.id !== profileId));
    };

    const handleProfileSelect = (profile) => {
        setSelectedProfile(profile);
    };

    let contentToRender;
    if (selectedProfile) {
        contentToRender = (
            <motion.div
                key="main-app-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`main-app-content ${showSidebar ? 'sidebar-open' : ''}`}
            >
                <Sidebar
                    selectedProfile={selectedProfile}
                    setSelectedProfile={setSelectedProfile}
                    onSearchClick={() => {
                        setShowSearchOverlay(true);
                        setSearchResults([]); // Clear previous search results
                        setShowSidebar(false); // Close sidebar on search click
                    }}
                    onHomeClick={() => {
                        setShowSearchOverlay(false);
                        setShowSearchResults(false);
                        setShowSidebar(false); // Close sidebar on home click
                    }}
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                />
                {showSearchOverlay ? (
                    <SearchOverlay
                        setSearchResults={setSearchResults}
                        setShowSearchOverlay={setShowSearchOverlay}
                        searchResults={searchResults} // Pass searchResults as a prop
                    />
                ) : showSearchResults ? (
                    <MovieSuggestions moviesToDisplay={searchResults} />
                ) : (
                    <HomeContent />
                )}
            </motion.div>
        );
    } else if (showCreateProfile) {
        contentToRender = (
            <motion.div
                key="create-profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <CreateProfile addProfile={addProfile} setShowCreateProfile={setShowCreateProfile} />
            </motion.div>
        );
    } else {
        contentToRender = (
            <motion.div
                key="profile-selection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <ProfileSelection
                    profiles={profiles}
                    handleProfileSelect={handleProfileSelect}
                    setShowCreateProfile={setShowCreateProfile}
                    deleteProfile={deleteProfile}
                />
            </motion.div>
        );
    }

    return (
        <div className="App">
            <AnimatePresence mode="wait">
                {contentToRender}
            </AnimatePresence>
            {selectedProfile && !showSearchOverlay && !showCreateProfile && (
                <button className="sidebar-toggle-btn" onClick={() => setShowSidebar(!showSidebar)}>
                    ☰
                </button>
            )}
        </div>
    );
}

export default App;