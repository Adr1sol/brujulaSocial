import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Footer.module.css';

const Footer = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm(
      'service_brújsocial',
      'template_04x8nv8',
      form.current,
      'PqiJvteOASIPUBLJl'
    )
    .then(() => {
      setStatus({ message: '¡Mensaje enviado!', type: 'success' });
      form.current.reset();
    })
    .catch((error) => {
      console.error('Error:', error);
      setStatus({ message: 'Error al enviar.', type: 'error' });
    })
    .finally(() => setIsSending(false));
  };

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles['footer-content']}>

        {/* Sección 1: Branding y Legal */}
        <div className={styles['footer-section']}>
          <div className={styles.brandWrapper}>
            <h3 className={styles.title}>Brújula Social</h3>
            <p>Orientación y conexión social para una mejor comunidad.</p>
          </div>
          <div className={styles.legalWrapper} style={{ marginTop: '1.5rem' }}>
            <h3 className={styles.title}>Legal</h3>
            <ul>
              <li><a href="/terminos">Términos y Condiciones</a></li>
            </ul>
          </div>
        </div>

        {/* Sección 2: Redes Sociales */}
        <div className={styles['footer-section']}>
          <h3 className={styles.title}>Redes Sociales</h3>
          <div className={styles['social-links']}>
            <a href="https://www.facebook.com/share/1GSk2AgJZJ/" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>
            <a href="https://www.instagram.com/brujula._.social?utm_source=qr&igsh=OXQ2ZnRjaTFjNG1h" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-7.325 3.166-7.525 7.525-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.2 4.358 3.166 7.325 7.525 7.525 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.358-.2 7.325-3.166 7.525-7.525.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.2-4.358-3.166-7.325-7.525-7.525-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a href="https://x.com/Brujulaa_Social" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.31 17.41z" />
              </svg>
              <span>X (Twitter)</span>
            </a>
          </div>
        </div>

        {/* Sección 3: Formulario */}
        <div className={styles['footer-section']}>
          <h3 className={styles.title}>Hablemos</h3>
          <form ref={form} onSubmit={sendEmail} className={styles.form}>
            <input
              type="email"
              name="user_email"
              placeholder="Tu correo electrónico"
              required
              className={styles.inputField}
            />
            <textarea
              name="message"
              placeholder="¿Cómo quieres ayudar?"
              rows="2"
              className={styles.inputField}
            ></textarea>
            <button
              type="submit"
              disabled={isSending}
              className={styles.submitBtn}
            >
              {isSending ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
            </button>
            {status.message && (
              <p className={`${styles.statusMsg} ${styles[status.type]}`}>
                {status.message}
              </p>
            )}
          </form>
        </div>

        {/* Sección 4: Contacto y Mapa */}
        <div className={styles.mapCol}>
          <h4 className={styles.title}>Ubicación</h4>
          <div className={styles.mapWrapper}>
            <img
              src="https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&q=80&w=400"
              alt="Ubicación"
              className={styles.mapImg}
            />
            <div className={styles.mapOverlay}>
              <a href="https://www.google.com/maps/place/Lim%C3%B3n/@10.0081724,-84.5694632,331437m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8fa71808603dc769:0x5a58748f67d92dde!8m2!3d10.1064393!4d-83.5070203!16zL20vMDJwNzBs?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D" className={styles.mapBtn}>ABRIR GOOGLE MAPS</a>
            </div>
          </div>
        </div>

      </div>

      {/* Footer inferior */}
      <div className={styles['footer-bottom']}>
        <p>© 2026 Brújula Social. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;