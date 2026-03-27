// components/Testimonials/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Testimonials.css';

const StarRating = ({ rating }) => {
  return (
    <div className="review-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= rating ? 'var(--google-teal)' : '#dadce0' }}>
          ★
        </span>
      ))}
    </div>
  );
};

const RatingSummary = ({ testimonials }) => {
  const totalReviews = testimonials.length;
  
  // Calcular promedio
  const averageRating = totalReviews > 0 
    ? (testimonials.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalReviews).toFixed(1)
    : 0;

  // Calcular distribución
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  testimonials.forEach(t => {
    const r = t.rating || 5;
    if (counts[r] !== undefined) counts[r]++;
  });

  const ratings = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    percentage: totalReviews > 0 ? (counts[stars] / totalReviews) * 100 : 0
  }));

  return (
    <div className="rating-summary">
      <div className="rating-header">
        <div className="rating-score-container">
          <div className="rating-score-big">{averageRating}</div>
          <StarRating rating={Math.round(averageRating)} />
          <div className="rating-count">{totalReviews} {totalReviews === 1 ? 'opinión' : 'opiniones'}</div>
        </div>
        <div className="rating-bars">
          {ratings.map((r) => (
            <div key={r.stars} className="rating-bar-row">
              <span className="star-num">{r.stars}</span>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: `${r.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user_testimonials');
    if (stored) {
      const parsed = JSON.parse(stored);
      setAllTestimonials(parsed);
    } else {
      setAllTestimonials([]);
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este testimonio?')) {
      const updated = allTestimonials.filter(t => t.id !== id);
      setAllTestimonials(updated);
      localStorage.setItem('user_testimonials', JSON.stringify(updated));
    }
  };

  const visibleTestimonials = showAll ? allTestimonials : allTestimonials.slice(0, 3);

  return (
    <section className="testimonials-section">
      <h2>Opiniones de la Comunidad</h2>

      <RatingSummary testimonials={allTestimonials} />

      <div className="testimonials-grid">
        {visibleTestimonials.length > 0 ? (
          visibleTestimonials.map((t) => (
            <div key={t.id || Math.random()} className="testimonial-card">
              <button 
                className="btn-delete" 
                onClick={() => handleDelete(t.id)}
                title="Eliminar testimonio"
              >
                &times;
              </button>
              <div className="author-info">
                <div className="avatar-circle">{t.initials || (t.name ? t.name[0] : 'U')}</div>
                <div>
                  <h4>{t.name}</h4>
                  <div className="review-meta">
                    <StarRating rating={t.rating || 5} />
                    <span className="review-date">{t.date}</span>
                  </div>
                </div>
              </div>
              <p className="quote-text">{t.text}</p>
              <span className={`tag ${t.role?.toLowerCase().includes('voluntario') ? 'tag-teal' : 'tag-orange'}`}>
                {t.role?.toUpperCase()}
              </span>
            </div>
          ))
        ) : (
          <p className="no-testimonials">Aún no hay opiniones. ¡Sé el primero en dejar una!</p>
        )}
      </div>

      <div className="testimonials-footer-actions">
        {allTestimonials.length > 3 && (
          <button 
            className="btn-ver-mas" 
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Ver menos' : 'Ver más opiniones'}
          </button>
        )}
        
        <Link to="/dejar-testimonio" className="btn-dejar-testimonio">
          Dejar mi testimonio
        </Link>
      </div>
    </section>
  );
};

export default Testimonials;