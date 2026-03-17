import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Brújula Social</h3>
          <p>Orientación y conexión social para una mejor comunidad.</p>
        </div>

        <div className={styles.footerSection}>
          <h3>Redes Sociales</h3>
          <div className={styles.socialLinks}>
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
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.268.195-6.379 2.3-6.574 6.574-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.195 4.272 2.305 6.38 6.574 6.574 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.268-.195 6.379-2.3 6.574-6.574.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.195-4.272-2.305-6.38-6.574-6.574-1.28-.058-1.688-.072-4.947-.072z"/>
                <path d="M12 6.865c-2.841 0-5.135 2.294-5.135 5.135s2.294 5.135 5.135 5.135 5.135-2.294 5.135-5.135-2.294-5.135-5.135-5.135zm0 8.27c-1.732 0-3.135-1.403-3.135-3.135s1.403-3.135 3.135-3.135 3.135 1.403 3.135 3.135-1.403 3.135-3.135 3.135zm6.365-8.88c-.414 0-.75.336-.75.75s.336.75.75.75.75-.336.75-.75-.336-.75-.75-.75z"/>
              </svg>
              <span>Instagram</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3>Legal</h3>
          <ul>
            <li><a href="/privacidad">Política de Privacidad</a></li>
            <li><a href="/terminos">Términos y Condiciones</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Contacto</h3>
          <p>Email: brujulasocialinfo@gmail.com</p>
          <p>Tel: +506 2121-2121</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2026 Brújula Social. Todos los derechos reservados.</p>
        <p>Hecho con ❤️ en Costa Rica</p>
      </div>
    </footer>
  );
};

export default Footer;
