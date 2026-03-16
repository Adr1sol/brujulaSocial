import React from 'react';
import styles from './Legal.module.css';

const Terminos = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Términos y Condiciones</h1>
      
      <div className={styles.section}>
        <h2>1. Aceptación de Términos</h2>
        <p>Al utilizar Brújula Social, aceptas cumplir con nuestros términos de uso diseñados para mantener una comunidad de voluntariado segura y respetuosa.</p>
      </div>

      <div className={styles.section}>
        <h2>2. Responsabilidades del Usuario</h2>
        <p>Los voluntarios se comprometen a proporcionar información verídica y a actuar con integridad en los proyectos sociales en los que participen.</p>
      </div>

      <div className={styles.section}>
        <h2>3. Propiedad Intelectual</h2>
        <p>Todo el contenido y logotipos de Brújula Social están protegidos por derechos de autor y no pueden ser utilizados sin autorización previa.</p>
      </div>

      <p className={styles.lastUpdated}>Última actualización: 16 de marzo, 2026</p>
    </div>
  );
};

export default Terminos;
