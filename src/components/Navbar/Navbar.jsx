import React from 'react';
import { Link } from 'react-router-dom';
import logoSinNombre from '../../images/logoSinNombre.png';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ redirigir }) => {
  const navigate = useNavigate()
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles['nav-logo-container']}>
        <img src={logoSinNombre} alt="Brújula Social Logo" className={styles['navbar-logo']} />
        <span className={styles['nav-logo']}>Brújula Social</span>
      </Link>
      <ul className={styles['nav-links']}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/inicio">Iniciar Sesión</Link></li>
        <li><Link to="/registro">Registro</Link></li>
        <li onClick={redirigir}><Link>Contacto</Link></li>
        <li><button onClick={() => navigate("/donacion")} className={styles['btn-donate']}>❤️ Donación</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
