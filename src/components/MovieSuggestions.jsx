import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MovieSuggestions = ({ moviesToDisplay }) => {
    const [videoUrl, setVideoUrl] = useState('');

    const handleViewClick = (movie) => {
        setVideoUrl(`https://vidfast.pro/movie/${movie.id}`);
    };

    const handleCheckRatingClick = (movie) => {
        alert(`TMDB Rating: ${movie.vote_average.toFixed(1)}/10`);
    };

    return (
        <div className="movie-suggestions-container">
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

            <div className="movie-grid">
                {moviesToDisplay.map(movie => (
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
        </div>
    );
};

export default MovieSuggestions;