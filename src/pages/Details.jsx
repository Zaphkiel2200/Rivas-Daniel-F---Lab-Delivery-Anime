import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnimeDetails } from '../services/api';

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getAnimeDetails(id);
                setAnime(data);
            } catch (err) {
                setError('Failed to load anime details.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) return <div className="loading">Loading details...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!anime) return <div className="error">Anime not found</div>;

    return (
        <div className="container details-container">
            <img
                src={anime.images.webp.large_image_url || anime.images.jpg.large_image_url}
                alt={anime.title}
                className="details-image"
            />
            <div className="details-content">
                <button onClick={() => navigate(-1)} className="back-btn">
                    &larr; Back to List
                </button>
                <h1 className="details-title">{anime.title}</h1>
                <div className="details-meta">
                    <span className="badge">{anime.type}</span>
                    <span className="badge">{anime.status}</span>
                    <span className="badge">{anime.duration}</span>
                    <span className="badge">Score: {anime.score}</span>
                </div>
                <div className="details-meta">
                    <span style={{ fontSize: '0.9rem', color: '#a7a9be' }}>
                        Aired: {anime.aired?.string}
                    </span>
                </div>
                <p className="details-synopsis">{anime.synopsis}</p>

                {anime.trailer?.url && (
                    <div style={{ marginTop: '2rem' }}>
                        <a
                            href={anime.trailer.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Watch Trailer &rarr;
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Details;
