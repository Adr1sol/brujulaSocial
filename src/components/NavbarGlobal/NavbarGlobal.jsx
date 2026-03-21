import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './NavbarGlobal.module.css';

// Usamos export default para que React lo encuentre al importar
export default function NavbarGlobal({ links = [], usuario = null }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        const confirmar = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
        if (confirmar) {
            localStorage.removeItem("user");
            navigate('/');
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                {/* Cambia el texto por tu logo si prefieres */}
                <Link to="/">🧭 Brújula Social</Link>
            </div>

            <ul className={styles.navLinks}>
                {links.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <li key={index}>
                            <Link 
                                to={item.path} 
                                className={`${styles.link} ${isActive ? styles.linkActivo : ''}`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
                
                {usuario && (
                    <li className={styles.userBadge}>
                        <div className={styles.avatarMini}>
                            {usuario.Nombre ? usuario.Nombre.substring(0,2).toUpperCase() : '??'}
                        </div>
                        <span className={styles.userName}>{usuario.Nombre}</span>
                    </li>
                )}

                <li>
                    <button onClick={handleLogout} className={styles.btnLogout}>
                        Salir
                    </button>
                </li>
            </ul>
        </nav>
    );
}