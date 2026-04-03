import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import Carrusel from '../Carrusel/Carrusel';

const Hero = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <section className="hero">

      {/* Carrusel de fondo */}
      <div className="carousel-background">
        <Carrusel />
      </div>

      {/* Overlay degradado */}
      <div className="hero-overlay" />

      {/* Contenido principal */}
      <div className="hero-content">
        <span className="hero-tag">🌿 VOLUNTARIADO EN COSTA RICA</span>
        <h1 className="hero-title">
          <br />
          <br />
          <br />
          <br />
          Encuentra tu causa.<br />
          <span className="hero-title-accent">Impacta tu mundo.</span>
        </h1>
        <p className="hero-subtitle">
          Conectamos personas apasionadas con organizaciones que necesitan tu ayuda.
        </p>
        <div className="hero-buttons">

          {/* ✅ Si ya está logueado va al buscador, si no va a registro */}
          <button
            className="btn-primary"
            onClick={() => navigate(usuario ? '/buscador' : '/registro')}
          >
            {usuario ? 'Explorar causas' : 'Regístrate y Ayuda'}
          </button>

          <button
            className="btn-secondary"
            onClick={() => navigate('/buscador')}
          >
            Ver organizaciones →
          </button>

        </div>
      </div>

      {/* Estadísticas flotantes */}
      <div className="hero-stats">
        <div className="hero-stat-item">
          <div className="hero-stat-num">15+</div>
          <div className="hero-stat-label">Organizaciones</div>
        </div>
        <div className="hero-stat-divider" />
        <div className="hero-stat-item">
          <div className="hero-stat-num">100+</div>
          <div className="hero-stat-label">Voluntarios</div>
        </div>
        <div className="hero-stat-divider" />
        <div className="hero-stat-item">
          <div className="hero-stat-num">7</div>
          <div className="hero-stat-label">Provincias</div>
        </div>
        <div className="hero-stat-divider" />
        <div className="hero-stat-item">
          <div className="hero-stat-num">5</div>
          <div className="hero-stat-label">Categorías</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;