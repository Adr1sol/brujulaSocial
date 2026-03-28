import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';
import Carrusel from '../Carrusel/Carrusel';
import logoFull from '/logoredondo.png';

const Hero = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <section className={styles.hero}>

      {/* Carrusel de fondo */}
      <div className={styles['carousel-background']}>
        <Carrusel />
      </div>

      {/* Overlay degradado */}
      <div className={styles['hero-overlay']} />

      {/* Contenido principal */}
      <div className={styles['hero-content']}>
        <img src={logoFull} alt="Brújula Social Logo" className={styles['hero-logo']} />
        <h1 className={styles['hero-title']}>
          Encuentra voluntariados reales.<br />
          <span className={styles['hero-title-accent']}>Empieza a ayudar hoy.</span>
        </h1>
        <p className={styles['hero-subtitle']}>
          Conectamos personas con organizaciones que necesitan apoyo en este momento. Descubre oportunidades cerca de ti y participa sin complicaciones
        </p>
        <div className={styles['hero-buttons']}>

          <button
            className={styles['btn-primary']}
            onClick={() => navigate(usuario ? '/buscador' : '/registro')}
          >
            <span>{usuario ? 'Explorar causas' : 'Crear cuenta gratis'}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>

          <button
            className={styles['btn-secondary']}
            onClick={() => navigate('/buscador')}
          >
            <span>Explorar organizaciones</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
          </button>

        </div>
      </div>

    </section>
  );
};

export default Hero;