// components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-icon">N</span>
            <span className="logo-text-white">BRÚJULA SOCIAL</span>
          </div>
          <p>Liderando el cambio social a través del voluntariado e involucrando a todo el territorio nacional.</p>
          <div className="social-icons">
            <span>🔵</span>
            <span>📷</span>
            <span>🌐</span>
          </div>
        </div>
        
        <div className="footer-links">
          <h4>EXPLORAR</h4>
          <ul>
            <li><a href="#about">Sobre Nosotros</a></li>
            <li><a href="#projects">Nuestros Proyectos</a></li>
            <li><a href="#blog">Blog de Impacto</a></li>
            <li><a href="#faq">Preguntas Frecuentes</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>LEGAL</h4>
          <ul>
            <li><a href="#terms">Términos de Uso</a></li>
            <li><a href="#privacy">Privacidad</a></li>
            <li><a href="#security">Seguridad</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>CONTACTO</h4>
          <p>📍 San José, Costa Rica</p>
          <p>📞 +506 4000-0000</p>
          <p>✉️ info@brujulasocial.cr</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2026 Brújula Social. Todos los derechos reservados.</p>
        <p>Hecho con ❤️ en Costa Rica</p>
      </div>
    </footer>
  );
};

export default Footer;