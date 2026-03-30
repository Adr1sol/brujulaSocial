import React from 'react'
import styles from './AboutUs.module.css'
import { CompassIcon, HeartIcon, CommunityIcon } from './Icons'

const AboutUs = () => {
  return (
    <section className={styles['about-section']} id="about">
      <div className={styles['about-container']}>

        {/* Leyenda y Títulos */}
        <div className={styles['about-left']}>
          <div className={styles['section-tag']}>
            <span className={styles['tag-line']}></span>
            <span className={styles['tag-text']}>PROPÓSITO VITAL</span>
          </div>

          <h2 className={styles['main-title']}>
            <span className={styles['title-dark']}>Nuestra</span><br />
            <span className={styles['title-green']}>Misión</span>
          </h2>

          <p className={styles['mission-desc']}>
            Conectamos el talento y el corazón de los costarricenses con las causas que necesitan manos para transformar realidades.
          </p>

          <div className={styles['stats-container']}>
            <div className={styles['stat-box']}>
              <h4 className={`${styles['stat-number']} ${styles['green-text']}`}>2.4k+</h4>
              <p className={styles['stat-label']}>VOLUNTARIOS<br />REGISTRADOS</p>
            </div>
            <div className={styles['stat-box']}>
              <h4 className={`${styles['stat-number']} ${styles['orange-text']}`}>15</h4>
              <p className={styles['stat-label']}>CAUSAS<br />APOYADAS</p>
            </div>
          </div>
        </div>

        {/* Tarjetas Informativas */}
        <div className={styles['about-right']}>
          <div className={styles['cards-grid']}>

            <div className={`${styles['mission-card']} ${styles['card-green']}`}>
              <div className={styles['card-icon-wrapper']}>
                <CompassIcon />
              </div>
              <h3>Nuestra<br/>Brújula</h3>
              <p>Guiamos tu impacto social hacia los proyectos donde tu ayuda sea más efectiva y gratificante.</p>
              <a href="#proyectos" className={styles['card-link']}>VER PROYECTOS &rarr;</a>
            </div>

            <div className={`${styles['mission-card']} ${styles['card-blue']}`}>
              <div className={styles['card-icon-wrapper']}>
                <HeartIcon />
              </div>
              <h3>Pasión</h3>
              <p>Ponemos el corazón en cada acción, fomentando la empatía y la solidaridad en todo el país.</p>
            </div>

            <div className={`${styles['mission-card']} ${styles['card-brown']}`}>
              <div className={styles['brown-inner']}>
                <div className={`${styles['card-icon-wrapper']} ${styles.large}`}>
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