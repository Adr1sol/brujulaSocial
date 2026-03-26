// components/Testimonials/Testimonials.jsx
import React from 'react';
import './Testimonials.css';
import videoVoluntariado from '../../assets/Video_de_Voluntariados_en_Costa_Rica.mp4';

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h2>Voluntariados Inspiradores </h2>

      <section className="video-section">
        <div className="video-placeholder">
          <video className="video-player" controls>
            <source src={videoVoluntariado} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </section>

      <div className="testimonials-grid">
        <div className="testimonial-card">
          <div className="quote-icon bg-orange">"</div>
          <p className="quote-text">"Brújula Social me permitió encontrar un proyecto de reforestación que cambió mi perspectiva sobre el medio ambiente."</p>
          <div className="author-info">
            <div className="avatar"></div>
            <div>
              <h4>María González</h4>
              <span className="tag tag-teal">VOLUNTARIA REGISTRADA</span>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <div className="quote-icon bg-teal">"</div>
          <p className="quote-text">"Ser voluntario con adultos mayores ha sido la experiencia más gratificante de mi jubilación. La plataforma lo hace muy fácil."</p>
          <div className="author-info">
            <div className="avatar"></div>
            <div>
              <h4>Roberto Mora</h4>
              <span className="tag tag-orange">COORDINADOR DE REFUGIO</span>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <div className="quote-icon bg-orange">"</div>
          <p className="quote-text">"Conectar con otros jóvenes interesados en el rescate animal me motivó a crear mi propia red local de ayuda."</p>
          <div className="author-info">
            <div className="avatar"></div>
            <div>
              <h4>Andrés Castro</h4>
              <span className="tag tag-teal">VOLUNTARIO REGISTRADO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;