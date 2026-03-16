import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-content']}>
        <div className={styles['footer-section']}>
          <h3>BrújulaSocial</h3>
          <p>Orientación y conexión social para una mejor comunidad.</p>
        </div>

        <div className={styles['footer-section']}>
          <h3>Redes Sociales</h3>
          <div className={styles['social-links']}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <svg 
                width="20" 
                height="20" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined">photo_camera</span>
              <span>Instagram</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined">group</span>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <div className={styles['footer-section']}>
          <h3>Legal</h3>
          <ul>
            <li><a href="/privacidad">Política de Privacidad</a></li>
          </ul>
        </div>

        <div className={styles['footer-section']}>
          <h3>Contacto</h3>
          <p>Email: brujulasocialinfo@gmail.com</p>
          <p>Tel: +506 2121-2121</p>
        </div>
      </div>
      <div className={styles['footer-bottom']}>
        <p>&copy; 2026 BrújulaSocial. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
