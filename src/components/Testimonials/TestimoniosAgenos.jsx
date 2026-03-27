import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Testimonials.css';

const StarRating = ({ rating, interactive = false, onRatingChange }) => {
  return (
    <div className={interactive ? "star-rating-input" : "review-stars"}>
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          className={interactive ? `star-btn ${s <= rating ? 'active' : ''}` : ''}
          onClick={() => interactive && onRatingChange(s)}
          style={!interactive ? { color: s <= rating ? 'var(--google-teal)' : '#dadce0', background: 'none', border: 'none', padding: 0, fontSize: '0.8rem' } : {}}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const TestimoniosAgenos = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [savedTestimonials, setSavedTestimonials] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user_testimonials');
    if (stored) {
      setSavedTestimonials(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !text) return;

    const newTestimonial = {
      id: Date.now(),
      name,
      role: role || 'Voluntario',
      text,
      rating,
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      initials: getInitials(name),
      pending: true,
    };

    // Guardar en la cola de pendientes (no visible públicamente aún)
    const pendingRaw = localStorage.getItem('pending_testimonials');
    const pending = pendingRaw ? JSON.parse(pendingRaw) : [];
    pending.unshift(newTestimonial);
    localStorage.setItem('pending_testimonials', JSON.stringify(pending));

    // Resetear formulario y mostrar banner
    setName('');
    setRole('');
    setText('');
    setRating(5);
    setSubmitted(true);
  };

  return (
    <div className="testimonials-page">
      {savedTestimonials.length > 0 && (
        <section className="saved-testimonials-section" style={{ marginBottom: '4rem' }}>
          <h3>Testimonios de la Comunidad</h3>
          <div className="testimonials-grid">
            {savedTestimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="author-info">
                  <div className="avatar-circle">{t.initials || getInitials(t.name)}</div>
                  <div>
                    <h4>{t.name}</h4>
                    <div className="review-meta">
                      <StarRating rating={t.rating || 5} />
                      <span className="review-date">{t.date}</span>
                    </div>
                  </div>
                </div>
                <p className="quote-text">{t.text}</p>
                <span className={`tag ${t.role.toUpperCase().includes('VOLUNTARIO') ? 'tag-teal' : 'tag-orange'}`}>
                  {t.role.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="testimonials-form-section">
        <h2>Comparte tu experiencia</h2>
        <p>Tu historia puede inspirar a otros a unirse a Brújula Social.</p>

        {submitted ? (
          <div className="pending-banner">
            <div className="pending-icon">✅</div>
            <h3>¡Gracias por tu testimonio!</h3>
            <p>Tu comentario ha sido recibido y será revisado por nuestro equipo. Aparecerá en la página una vez aprobado.</p>
            <button className="btn-submit" style={{ marginTop: '1.5rem' }} onClick={() => setSubmitted(false)}>
              Enviar otro testimonio
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="testimonial-form">
            <div className="form-group">
              <label>Calificación</label>
              <StarRating rating={rating} interactive={true} onRatingChange={setRating} />
            </div>

            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Tu nombre" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Rol (Opcional)</label>
              <input 
                type="text" 
                id="role" 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                placeholder="Ej: Voluntario, Coordinador..." 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="text">Tu Testimonio</label>
              <textarea 
                id="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Cuéntanos tu historia..." 
                required
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-submit">Enviar Testimonio</button>
              <button type="button" className="btn-back" onClick={() => navigate(-1)}>Volver</button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default TestimoniosAgenos;
