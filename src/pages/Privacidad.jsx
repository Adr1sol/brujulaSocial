import React from 'react';
import styles from './Legal.module.css';

const Privacidad = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Política de Privacidad</h1>
      
      <div className={styles.section}>
        <h2>1. Recopilación de Información</h2>
        <p>En Brújula Social, nos tomamos muy en serio la privacidad de nuestros voluntarios. Recopilamos información básica como nombre y correo electrónico únicamente para facilitar la conexión con proyectos sociales.</p>
      </div>

      <div className={styles.section}>
        <h2>2. Uso de los Datos</h2>
        <p>Los datos proporcionados se utilizan exclusivamente para la gestión de voluntariado y comunicación interna de la plataforma. Nunca compartiremos tus datos con terceros sin tu consentimiento explícito.</p>
      </div>

      <div className={styles.section}>
        <h2>3. Seguridad</h2>
        <p>Implementamos medidas de seguridad técnicas para proteger tu información personal contra acceso no autorizado o pérdida.</p>
      </div>

      <p className={styles.lastUpdated}>Última actualización: 16 de marzo, 2026</p>
    </div>
  );
};

export default Privacidad;
