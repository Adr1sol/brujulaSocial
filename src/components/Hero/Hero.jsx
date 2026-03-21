// components/Hero/Hero.jsx
import React from 'react';
import './Hero.css';
import Carrusel from '../Carrusel/Carrusel';


const Hero = () => {
  return (
    <section className="hero">
      <div className="carousel-background">
        <Carrusel />
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="hero-tag">VOLUNTARIADO EN COSTA RICA</span>
        <h1 className="hero-title">Encuentra tu causa.<br/>Impacta tu mundo.</h1>
        <button className="btn-primary">Regístrate y Ayuda</button>
      </div>
      
    </section>
  );
};

export default Hero;