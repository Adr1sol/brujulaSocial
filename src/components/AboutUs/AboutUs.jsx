// components/About/About.jsx
import React from 'react';
import '../AboutUs/AboutUs.css';


const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-header">
        <h2>Nuestra Misión</h2>
        <p>Conectamos el talento y el corazón de los costarricenses con las causas que necesitan manos para transformar realidades.</p>
      </div>
      
      <div className="features-grid">
        <div className="feature-card brujula-card">
          <div className="feature-icon icon-teal">🧭</div>
          <h3>Nuestra Brújula</h3>
          <p>Guiamos tu impacto social hacia los proyectos donde tu ayuda sea más efectiva y gratificante.</p>
        </div>
        <div className="feature-card pasion-card">
          <div className="feature-icon icon-orange">❤️</div>
          <h3>Pasión</h3>
          <p>Ponemos el corazón en cada acción, fomentando la empatía y la solidaridad en todo el país.</p>
        </div>
        <div className="feature-card comunidad-card">
          <div className="feature-icon icon-green">👥</div>
          <h3>Comunidad</h3>
          <p>Unidos por un mejor país, creamos redes de apoyo robustas para todas las comunidades de Costa Rica.</p>
        </div>
      </div>
    </section>
  );
};

export default About;