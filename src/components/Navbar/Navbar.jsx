import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoSinNombre from '../../images/logoSinNombre.png';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();
  const isOnAuthPage = location.pathname === '/login' || location.pathname === '/registro';

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles['nav-logo-container']}>
        <img src={logoSinNombre} alt="Brújula Social Logo" className={styles['navbar-logo']} />
        <span className={styles['nav-logo']}>Brújula Social</span>
      </Link>
      <ul className={styles['nav-links']}>
        <li>
          <Link to="/" className={isOnAuthPage ? styles.navItemWithIcon : ''}>
            {isOnAuthPage && (
              <div className={styles.iconWrapper}>
                <i className={styles['gg-log-out']}></i>
              </div>
            )}
            Inicio
          </Link>
        </li>
        <li><Link to="/login">Iniciar Sesión</Link></li>
        <li><Link to="/registro">Registro</Link></li>
        <li><Link to="/consultas">Ayuda</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
