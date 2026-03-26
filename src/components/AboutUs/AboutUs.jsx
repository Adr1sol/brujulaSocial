
import React from 'react'
import './AboutUs.css'
import { CompassIcon, HeartIcon, CommunityIcon } from './Icons'

const AboutUs = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">

        {/* Leyenda y Títulos */}
        <div className="about-left">
          <div className="section-tag">
            <span className="tag-line"></span>
            <span className="tag-text">PROPÓSITO VITAL</span>
          </div>

          <h2 className="main-title">
            <span className="title-dark">Nuestra</span><br />
            <span className="title-green">Misión</span>
          </h2>

          <p className="mission-desc">
            Conectamos el talento y el corazón de los costarricenses con las causas que necesitan manos para transformar realidades.
          </p>

          <div className="stats-container">
            <div className="stat-box">
              <h4 className="stat-number green-text">2.4k+</h4>
              <p className="stat-label">VOLUNTARIOS<br />REGISTRADOS</p>
            </div>
            <div className="stat-box">
              <h4 className="stat-number orange-text">15</h4>
              <p className="stat-label">CAUSAS<br />APOYADAS</p>
            </div>
          </div>
        </div>

        {/* Tarjetas Informativas */}
        <div className="about-right">
          <div className="cards-grid">

            <div className="mission-card card-green">
              <div className="card-icon-wrapper">
                <CompassIcon />
              </div>
              <h3>Nuestra<br />Brújula</h3>
              <p>Guiamos tu impacto social hacia los proyectos donde tu ayuda sea más efectiva y gratificante.</p>
              <a href="#proyectos" className="card-link">VER PROYECTOS &rarr;</a>
            </div>

            <div className="mission-card card-blue">
              <div className="card-icon-wrapper">
                <HeartIcon />
              </div>
              <h3>Pasión</h3>
              <p>Ponemos el corazón en cada acción, fomentando la empatía y la solidaridad en todo el país.</p>
            </div>

            <div className="mission-card card-brown">
              <div className="brown-inner">
                <div className="card-icon-wrapper large">
                  <CommunityIcon />
                </div>
                <div>
                  <h3>Comunidad</h3>
                  <p>Unidos por un mejor país, creamos redes de apoyo robustas para todas las comunidades de Costa Rica.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );

};

export default AboutUs;