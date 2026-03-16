import React from 'react';
import { Link } from 'react-router-dom';
import logoSinNombre from '../../images/logoSinNombre.png';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles['nav-logo-container']}>
        <img src={logoSinNombre} alt="Brújula Social Logo" className={styles['navbar-logo']} />
        <span className={styles['nav-logo']}>Brújula Social</span>
      </Link>
      <ul className={styles['nav-links']}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/registro">Registro</Link></li>
        <li><Link to="/inicio-user">Contacto</Link></li>
        <li><Link to="/">Sobre Nosotros</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
