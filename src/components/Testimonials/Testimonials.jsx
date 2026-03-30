// components/Testimonials/Testimonials.jsx
import React from 'react';
import styles from './Testimonials.module.css';
import videoVoluntariado from '../Video/Video_de_Voluntariados_en_Costa_Rica.mp4';
import mariaAvatar from '../../assets/testimonials/maria.png';
import robertoAvatar from '../../assets/testimonials/roberto.png';
import andresAvatar from '../../assets/testimonials/andres.png';

const Testimonials = () => {
  return (
    <section className={styles['testimonials-section']}>
      <h2>Voluntariados Inspiradores </h2>

      <section className={styles['video-section']}>
        <div className={styles['video-placeholder']}>
          <video className={styles['video-player']} controls>
            <source src={videoVoluntariado} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </section>

      <div className={styles['testimonials-grid']}>
        <div className={styles['testimonial-card']}>
          <div className={`${styles['quote-icon']} ${styles['bg-orange']}`}>"</div>
          <p className={styles['quote-text']}>"Brújula Social me permitió encontrar un proyecto de reforestación que cambió mi perspectiva sobre el medio ambiente."</p>
          <div className={styles['author-info']}>
            <div className={styles.avatar}>
              <img src={mariaAvatar} alt="María González" />
            </div>
            <div>
              <h4>María González</h4>
              <span className={`${styles.tag} ${styles['tag-teal']}`}>VOLUNTARIA REGISTRADA</span>
            </div>
          </div>
        </div>

        <div className={styles['testimonial-card']}>
          <div className={`${styles['quote-icon']} ${styles['bg-teal']}`}>"</div>
          <p className={styles['quote-text']}>"Ser voluntario con adultos mayores ha sido la experiencia más gratificante de mi jubilación. La plataforma lo hace muy fácil."</p>
          <div className={styles['author-info']}>
            <div className={styles.avatar}>
              <img src={robertoAvatar} alt="Roberto Mora" />
            </div>
            <div>
              <h4>Roberto Mora</h4>
              <span className={`${styles.tag} ${styles['tag-orange']}`}>COORDINADOR DE REFUGIO</span>
            </div>
          </div>
        </div>

        <div className={styles['testimonial-card']}>
          <div className={`${styles['quote-icon']} ${styles['bg-orange']}`}>"</div>
          <p className={styles['quote-text']}>"Conectar con otros jóvenes interesados en el rescate animal me motivó a crear mi propia red local de ayuda."</p>
          <div className={styles['author-info']}>
            <div className={styles.avatar}>
              <img src={andresAvatar} alt="Andrés Castro" />
            </div>
            <div>
              <h4>Andrés Castro</h4>
              <span className={`${styles.tag} ${styles['tag-teal']}`}>VOLUNTARIO REGISTRADO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;