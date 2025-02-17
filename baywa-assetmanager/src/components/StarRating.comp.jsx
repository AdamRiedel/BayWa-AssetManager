import React from "react";
import "./StarRating.styles.css";

export const StarRating = ({ rating, maxRating = 5 }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const decimal = rating % 1;

    // Volle Sterne
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <div key={`star-${i}`} className="star-wrapper">
          <span className="star full">★</span>
        </div>
      );
    }

    // Partieller Stern
    if (decimal > 0) {
      stars.push(
        <div key="star-partial" className="star-wrapper">
          <span className="star empty">★</span>
          <div className="star-fill" style={{ width: `${decimal * 100}%` }}>
            <span className="star full">★</span>
          </div>
        </div>
      );
    }

    // Leere Sterne
    const remainingStars = maxRating - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <div key={`star-empty-${i}`} className="star-wrapper">
          <span className="star empty">★</span>
        </div>
      );
    }

    return stars;
  };

  return (
    <div className="star-rating">
      <div className="stars-container">{renderStars()}</div>
      <span className="rating-number">({Number(rating).toFixed(1)})</span>
    </div>
  );
};
