import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles['footer-content']}>

        {/* Sección 1 */}
        <div className={styles['footer-section']}>
          <h3>Brújula Social</h3>
          <p>Orientación y conexión social para una mejor comunidad.</p>
        </div>

        {/* Sección 2 */}
        <div className={styles['footer-section']}>
          <h3>Redes Sociales</h3>
          <div className={styles['social-links']}>

            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2h10c2.76 0 5 2.24 5 5v10c0 2.76-2.24 5-5 5H7c-2.76 0-5-2.24-5-5V7c0-2.76 2.24-5 5-5zm0 2c-1.66 0-3 1.34-3 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V7c0-1.66-1.34-3-3-3H7zm11 1.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              <span>Instagram</span>
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a2.7 2.7 0 00-2.7-2.7c-1.2 0-2.2.8-2.5 1.7v-1.4h-2.5v7.7h2.5v-4.1a1.2 1.2 0 011.2-1.2h.3c.7 0 1 .5 1 1.2v4.1h2.5M8.1 18.5v-7.7H5.6v7.7h2.5M7 9a1.4 1.4 0 100-2.8A1.4 1.4 0 007 9"/>
              </svg>
              <span>LinkedIn</span>
            </a>

          </div>
        </div>

        {/* Sección 3 */}
        <div className={styles['footer-section']}>
          <h3>Legal</h3>
          <ul>
            <li><a href="/privacidad">Política de Privacidad</a></li>
            <li><a href="/terminos">Términos y Condiciones</a></li>
          </ul>
        </div>

        {/* Sección 4 */}
        <div className={styles['footer-section']}>
          <h3>Contacto</h3>
          <p>Email: brujulasocialinfo@gmail.com</p>
          <p>Tel: +506 2121-2121</p>
        </div>

      </div>

      {/* Footer inferior */}
      <div className={styles['footer-bottom']}>
        <p>&copy; 2026 Brújula Social. Todos los derechos reservados.</p>
        <p>Hecho con ❤️ en Costa Rica</p>
      </div>

    </footer>
  );
};

export default Footer;