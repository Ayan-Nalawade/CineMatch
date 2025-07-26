import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieSuggestions from './MovieSuggestions';

const HomeContent = () => {
    const [popularMovies, setPopularMovies] = useState([]);

    const fetchPopularMovies = async () => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                params: {
                    api_key: '84295144f3188339baa1a7dceff5c72c',
                    page: Math.floor(Math.random() * 10) + 1,
                },
            });
            const shuffledMovies = response.data.results.sort(() => 0.5 - Math.random());
            setPopularMovies(shuffledMovies.slice(0, 12)); // Display more movies on home
        } catch (error) {
            console.error('Error fetching popular movies:', error);
        }
    };

    useEffect(() => {
        fetchPopularMovies();
        const interval = setInterval(fetchPopularMovies, 10000); // Refresh every 10 seconds
        return () => clearInterval(interval);
    }, []);

    return <MovieSuggestions moviesToDisplay={popularMovies} />;
};

export default HomeContent;