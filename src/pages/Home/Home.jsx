import React from 'react';
import styles from './Home.module.css';
import videoVoluntariado from '../../images/Video_Voluntariado_Testimonio.mp4';

const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1>Brújula Social</h1>
        <p>Conectando al voluntariado con el impacto social en Costa Rica.</p>
      </header>
      
      <section className={styles.videoSection}>
        <div className={styles.videoPlaceholder}>
          <video className={styles.videoPlayer} controls>
            <source src={videoVoluntariado} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </section>
    </div>
  );
};


export default Home;
