import React from 'react';
import { Link } from 'react-router-dom';
import logoSinNombre from '../../images/logoSinNombre.png';
import styles from './NavbarOrg.module.css';

const NavbarOrg = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles['nav-logo-container']}>
        <img src={logoSinNombre} alt="Brújula Social Logo" className={styles['navbar-logo']} />
        <div className={styles['logo-text']}>
            <span className={styles['nav-logo']}>Brújula Social</span>
            <span className={styles['nav-sublogo']}>Organizaciones</span>
        </div>
      </Link>
      <ul className={styles['nav-links']}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/registro">Salir del Panel</Link></li>
      </ul>
    </nav>
  );
};

export default NavbarOrg;
