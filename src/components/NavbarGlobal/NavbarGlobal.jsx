import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './NavbarGlobal.module.css';
import logoImg from '/logoredondo.png';
import Swal from 'sweetalert2';

export default function NavbarGlobal() {
    const navigate = useNavigate();
    const location = useLocation();
    const path     = location.pathname;

    if (path === '/inicio' || path === '/registro' || path === '/register' || path === '/perfil' || path === "" || path === '/buscador' || path === '/terminos')  return null;

    const usuario = JSON.parse(localStorage.getItem("user") || "null");
    const tipo    = usuario?.Tipo || null;
    const esHome  = path === '/' || path === '/home';

    const handleLogout = () => {
        Swal.fire({
            title: '¿Cerrar sesión?',
            text: "Tendrás que ingresar tus datos nuevamente para entrar.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#078A87',
            cancelButtonColor: '#EF8514',
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("user");
                localStorage.removeItem("miOrganizacion");
                navigate('/');
                Swal.fire({
                    title: '¡Sesión cerrada!',
                    text: 'Te esperamos pronto.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const handleScrollLink = (scrollId) => {
        if (esHome) {
            scrollTo(scrollId);
        } else {
            navigate('/');
            setTimeout(() => scrollTo(scrollId), 400);
        }
    };

    // ── Links según ROL + PÁGINA ───────────────────────────────
    let links = [];

    if (!usuario) {
        if (path === '/inicio') {
            // ✅ En login — muestra scroll links + solo Registrarse
            links = [
                { label: 'Sobre nosotros', scrollId: 'sobre-nosotros' },
                { label: 'Organizaciones', scrollId: 'organizaciones' },
                { label: 'Contacto',       scrollId: 'footer' },
                { label: 'Registrarse',    path: '/registro', btn: 'register' },
            ];
        } else if (path === '/registro') {
            // ✅ En registro — muestra scroll links + solo Iniciar sesión
            links = [
                { label: 'Sobre nosotros', scrollId: 'sobre-nosotros' },
                { label: 'Organizaciones', scrollId: 'organizaciones' },
                { label: 'Contacto',       scrollId: 'footer' },
                { label: 'Iniciar sesión', path: '/inicio', btn: 'login' },
            ];
        } else {
            // Visitante en cualquier otra página
            links = [
                { label: 'Sobre nosotros', scrollId: 'sobre-nosotros' },
                { label: 'Organizaciones', scrollId: 'organizaciones' },
                { label: 'Contacto',       scrollId: 'footer' },
                { label: 'Iniciar sesión', path: '/inicio',   btn: 'login' },
                { label: 'Registrarse',    path: '/registro', btn: 'register' },
            ];
        }

    } else if (tipo === 'voluntario') {
        if (esHome) {
            links = [
                { label: 'Sobre nosotros', scrollId: 'sobre-nosotros' },
                { label: 'Organizaciones', scrollId: 'organizaciones' },
                { label: 'Mi Perfil',      path: '/perfil' },
                { label: 'Contacto',       scrollId: 'footer' },
            ];
        } else if (path === '/buscador') {
            links = [
                { label: 'Home',      path: '/' },
                { label: 'Mi Perfil', path: '/perfil' },
            ];
        } else if (path === '/perfil' || path === '/impacto') {
            links = [
                { label: 'Home',           path: '/' },
                { label: 'Organizaciones', path: '/buscador' },
            ];
        } else {
            links = [
                { label: 'Home',           path: '/' },
                { label: 'Organizaciones', path: '/buscador' },
                { label: 'Mi Perfil',      path: '/perfil' },
            ];
        }

    } else if (tipo === 'admin') {
        links = [];

    } else if (tipo === 'organizacion') {
        links = [
            { label: 'Mi Organización', path: '/miOrganizacion' },
        ];
    }

    // ── Renderizar cada link ───────────────────────────────────
    const renderLink = (item, index) => {
        const isActive = item.path && path === item.path;

        if (item.btn === 'login') {
            return (
                <li key={index}>
                    <Link to={item.path} className={styles.btnLogin}>{item.label}</Link>
                </li>
            );
        }

        if (item.btn === 'register') {
            return (
                <li key={index}>
                    <Link to={item.path} className={styles.btnRegister}>{item.label}</Link>
                </li>
            );
        }

        if (item.scrollId) {
            return (
                <li key={index}>
                    <button
                        className={`${styles.link} ${styles.linkBtn}`}
                        onClick={() => handleScrollLink(item.scrollId)}
                    >
                        {item.label}
                    </button>
                </li>
            );
        }

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
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src={logoImg} alt="Brújula Social Logo" className={styles.logoImage} />
                    <span>Brújula Social</span>
                </Link>
            </div>

                {/* Links */}
                <ul className={styles.navLinks}>
                    {links.map((item, index) => renderLink(item, index))}

                    {usuario && (
                        <li>
                            <button onClick={handleLogout} className={styles.btnLogout}>
                                Cerrar sesión
                            </button>
                        </li>
                    )}
                </ul>
            
        </nav>
    );
}
