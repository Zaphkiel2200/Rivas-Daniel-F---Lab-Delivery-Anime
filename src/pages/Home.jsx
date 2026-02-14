import React, { useEffect, useState } from 'react';
import { getTopOnaAnime } from '../services/api';
import AnimeCard from '../components/AnimeCard';

const Home = () => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const data = await getTopOnaAnime();
                setAnimeList(data);
            } catch (err) {
                setError('Failed to load anime list. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAnime();
    }, []);

    if (loading) {
        return <div className="loading">Loading top ONAs...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="container">
            <h1>Top ONA Anime</h1>
            <div className="grid">
                {animeList.map((anime) => (
                    <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
            </div>
        </div>
    );
};

export default Home;
