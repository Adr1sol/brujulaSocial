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
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-7.325 3.166-7.525 7.525-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.2 4.358 3.166 7.325 7.525 7.525 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.358-.2 7.325-3.166 7.525-7.525.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.2-4.358-3.166-7.325-7.525-7.525-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z"/>
              </svg>
              <span>Instagram</span>
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
              <span>LinkedIn</span>
            </a>

          </div>
        </div>

        {/* Sección 3 */}
        <div className={styles['footer-section']}>
          <h3>Legal</h3>
          <ul>
      
            <li><a href="/terminos">Términos y Condiciones</a></li>
          </ul>
        </div>

        {/* Sección 4 */}
        <div className={styles['footer-section']}>
          <h3>Contacto</h3>
          <p>Email: brujulasocialinfo@gmail.com</p>
          <p>Tel: +506 2121-2121</p>
          <a href="https://www.google.com/maps/search/?api=1&query=Rescate+Wildlife+Rescue+Center%2C+2.3+km+al+este+del+cruce+de+Manolo%27s%2C+ruta+3%2C+hacia+el+B%C2%B0+San+Jos%C3%A9%2C+Provincia+de+Alajuela%2C+Alajuela" target="_blank" rel="noopener noreferrer">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.791659932463!2d-84.1888506852049!3d10.02993399283492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0f9a69151381d%3A0x1d293845b14a87c1!2sRescate%20Wildlife%20Rescue%20Center!5e0!3m2!1sen!2scr!4v1633020056914!5m2!1sen!2scr"
              width="200"
              height="150"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Ubicación de Rescate Wildlife Rescue Center"
            ></iframe>
          </a>
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