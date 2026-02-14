import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnimeCard = ({ anime }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/anime/${anime.mal_id}`);
    };

    return (
        <div className="card" onClick={handleCardClick} role="button" tabIndex={0}>
            <div className="card-image-container">
                <img
                    src={anime.images.webp.large_image_url || anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="card-image"
                    loading="lazy"
                />
            </div>
            <div className="card-content">
                <h3 className="card-title">{anime.title}</h3>

                <button className="btn-primary" onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick();
                }}>
                    See Details
                </button>
            </div>
        </div>
    );
};

export default AnimeCard;
