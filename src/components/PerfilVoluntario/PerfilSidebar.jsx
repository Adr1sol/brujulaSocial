import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './PerfilVoluntario.module.css';
import logoBrujula from '../../images/logoNavbar.png';

const navItems = [
    { id: 'resumen',           label: 'Mi Perfil',          icon: '◈', group: 'GENERAL' },
    { id: 'historial',         label: 'Mis Voluntariados', icon: '⏱️', group: 'GENERAL' },
    { id: 'mis-organizaciones',label: 'Mis Organizaciones',icon: '🏢', group: 'GENERAL' },
    { id: 'organizaciones',    label: 'Organizaciones',     icon: '🔍', group: 'GENERAL', route: '/buscador' },
];

export default function PerfilSidebar({
    user,
    activeTab,
    onTabChange,
    onEditarPerfil,
    onCerrarSesion,
    onEliminarCuenta
}) {
    const location = useLocation();

    const isActive = (item) => {
        if (item.route) {
            return location.pathname === item.route;
        }
        return activeTab === item.id;
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarBrand}>
                <img src={logoBrujula} alt="Brújula Social" className={styles.brandLogo} />
                <div>
                    <div className={styles.brandName}>
                        Brújula<span className={styles.brandAccent}>Social</span>
                    </div>
                    <div className={styles.brandSub}>VOLUNTARIO</div>
                </div>
            </div>

            <nav className={styles.sidebarNav}>
                <p className={styles.navGroupLabel}>GENERAL</p>
                {navItems.map((item) => (
                    item.route ? (
                        <Link
                            key={item.id}
                            to={item.route}
                            className={`${styles.navItem} ${isActive(item) ? styles.navItemActive : ''}`}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            <span className={styles.navLabel}>{item.label}</span>
                        </Link>
                    ) : (
                        <button
                            key={item.id}
                            className={`${styles.navItem} ${isActive(item) ? styles.navItemActive : ''}`}
                            onClick={() => onTabChange?.(item.id)}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            <span className={styles.navLabel}>{item.label}</span>
                        </button>
                    )
                ))}

                <p className={styles.navGroupLabel} style={{ marginTop: '24px' }}>AJUSTES</p>
                {onEditarPerfil && (
                    <button className={styles.navItem} onClick={onEditarPerfil}>
                        <span className={styles.navIcon}>✏️</span>
                        <span className={styles.navLabel}>Editar Perfil</span>
                    </button>
                )}
                {onEliminarCuenta && (
                    <button className={styles.navItem} onClick={onEliminarCuenta} style={{ color: 'var(--red)' }}>
                        <span className={styles.navIcon}>🗑️</span>
                        <span className={styles.navLabel}>Eliminar Cuenta</span>
                    </button>
                )}
            </nav>

            <div className={styles.sidebarFooter}>
                {user && (
                    <div className={styles.adminInfo} onClick={onEditarPerfil}>
                        <div className={styles.adminAvatar}>
                            {user.Nombre ? user.Nombre.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase() : 'US'}
                        </div>
                        <div>
                            <div className={styles.adminName}>{user.Nombre?.split(' ')[0] || 'Usuario'}</div>
                            <div className={styles.adminRole}>Ver Perfil</div>
                        </div>
                    </div>
                )}
                {onCerrarSesion && (
                    <button className={styles.navItem} onClick={onCerrarSesion} style={{ color: '#f87171' }}>
                        <span className={styles.navIcon}>🚪</span>
                        <span className={styles.navLabel}>Cerrar sesión</span>
                    </button>
                )}
            </div>
        </aside>
    );
}
