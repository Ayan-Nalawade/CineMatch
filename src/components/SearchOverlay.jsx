import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const SearchOverlay = ({ setSearchResults, setShowSearchOverlay, searchResults }) => {
    const [query, setQuery] = useState('');
    const [mediaType, setMediaType] = useState('movie');
    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);
    const [videoUrl, setVideoUrl] = useState('');

    const searchMovie = async () => {
        try {
            const searchType = mediaType === 'tv' ? 'tv' : 'movie';
            const response = await axios.get(`https://api.themoviedb.org/3/search/${searchType}`, {
                params: {
                    api_key: '84295144f3188339baa1a7dceff5c72c',
                    query: query,
                },
            });
            setSearchResults(response.data.results);
        } catch (error) {
            console.error('Error fetching data from TMDb:', error);
        }
    };

    const handleViewClick = (movie) => {
        setVideoUrl(`https://vidfast.pro/movie/${movie.id}`);
    };

    const handleCheckRatingClick = (movie) => {
        alert(`TMDB Rating: ${movie.vote_average.toFixed(1)}/10`);
    };

    return (
        <motion.div
            className="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <button className="close-search-overlay" onClick={() => setShowSearchOverlay(false)}>X</button>
            <div className="search-input-container">
                <input
                    type="text"
                    className="form-control-custom search-overlay-input"
                    placeholder="Search for a movie or TV show..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => { if (e.key === 'Enter') searchMovie(); }}
                />
                <button className="btn-custom search-overlay-btn" onClick={searchMovie}>
                    Search
                </button>
            </div>
            <div className="media-type-selector search-overlay-media-type">
                <button
                    className={`media-type-btn ${mediaType === 'movie' ? 'active' : ''}`}
                    onClick={() => setMediaType('movie')}
                >
                    Movie
                </button>
                <button
                    className={`media-type-btn ${mediaType === 'tv' ? 'active' : ''}`}
                    onClick={() => setMediaType('tv')}
                >
                    TV Show
                </button>
            </div>
            {mediaType === 'tv' && (
                <motion.div
                    className="series-inputs search-overlay-series-inputs"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    <input
                        type="number"
                        className="form-control-custom"
                        placeholder="Season"
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                    />
                    <input
                        type="number"
                        className="form-control-custom"
                        placeholder="Episode"
                        value={episode}
                        onChange={(e) => setEpisode(e.target.value)}
                    />
                </motion.div>
            )}

            <AnimatePresence>
                {videoUrl && (
                    <motion.div
                        className="video-container fullscreen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                        <button className="back-button" onClick={() => setVideoUrl('')}>← Back to Movies</button>
                        <iframe
                            src={videoUrl}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen
                            title="Video Player"
                        ></iframe>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="movie-grid search-results-grid">
                {searchResults.map(movie => (
                    <div key={movie.id} className="movie-item">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="movie-poster"
                        />
                        <p className="movie-title">{movie.title}</p>
                        <div className="movie-options">
                            <button className="option-btn" onClick={() => handleViewClick(movie)}>View</button>
                            <button className="option-btn" onClick={() => handleCheckRatingClick(movie)}>Check Rating</button>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default SearchOverlay;