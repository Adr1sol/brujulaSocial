import React from 'react';
import './terminos.css';
// ✅ Navbar eliminado — NavbarGlobal vive en Routing.jsx

const Terminos = () => {
    return (
    <div className="terminos-wrapper">
      <div className="terminos-container">
        <header className="terminos-header">
          <h1>Términos y Condiciones</h1>
          <p>Compromiso con la transparencia • Versión 2.0</p>
        </header>

        <section className="terminos-seccion">
          <h2>1. Nuestra Alianza</h2>
          <p>
            Al utilizar Brújula Social, entras en una comunidad dedicada al cambio positivo. Este documento rige nuestra relación y garantiza que todos operemos bajo los mismos estándares de respeto y seguridad.
          </p>
        </section>

        <section className="terminos-seccion">
          <h2>2. El Rol de la Plataforma</h2>
          <p>
            Actuamos como el puente tecnológico que une corazones voluntarios con causas nobles. Facilitamos la conexión, pero el impacto real sucede en el campo, bajo la tutela de las organizaciones anfitrionas.
          </p>
        </section>

        <section className="terminos-seccion">
          <h2>3. Código del Voluntario</h2>
          <ul>
            <li>Integridad en la información</li>
            <li>Respeto a la diversidad</li>
            <li>Compromiso con el tiempo</li>
            <li>Cumplimiento de normas éticas</li>
          </ul>
        </section>

        <section className="terminos-seccion">
          <h2>4. Estándares para Organizaciones</h2>
          <ul>
            <li>Seguridad del entorno</li>
            <li>Orientación clara</li>
            <li>Equidad en el trato</li>
            <li>Reconocimiento del esfuerzo</li>
          </ul>
        </section>

        <section className="terminos-seccion">
          <h2>5. Tu Privacidad</h2>
          <p>
            Tus datos son tu brújula personal. Los protegemos con estándares modernos de seguridad y solo los compartimos con las organizaciones con las que decidas conectar directamente.
          </p>
        </section>

        <section className="terminos-seccion">
          <h2>6. Compromiso Continuo</h2>
          <p>
            Brújula Social evoluciona. Nos reservamos el derecho de mejorar estos términos para adaptarnos a las nuevas formas de impacto social en Costa Rica, siempre notificándote con transparencia.
          </p>
        </section>

        <footer className="terminos-footer">
          <p>¿Tienes dudas? Escríbenos a hola@brujulasocial.com</p>
          <p style={{ marginTop: '10px', opacity: 0.5 }}>© 2026 Brújula Social Costa Rica</p>
        </footer>
      </div>
    </div>
    );
};

export default Terminos;