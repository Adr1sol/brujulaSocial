import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import styles from './MiOrganizacion.module.css'
import logoBrujula from '../../images/logoNavbar.png'

const navItems = [
    { id: 'resumen',     label: 'Mi Organización', icon: '🏢' },
    { id: 'dashboard',   label: 'Dashboard',        icon: '📊' },
    { id: 'voluntarios', label: 'Voluntarios',      icon: '👥' },
]

export default function OrgSidebar({ organizacion, activeTab, onTabChange, onEditar, onEliminar }) {
    const navigate = useNavigate()

    function handleCerrarSesion() {
        Swal.fire({
            icon: 'question',
            title: 'Cerrar sesión',
            text: '¿Estás seguro de que quieres cerrar sesión?',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#14b8a6'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('user')
                localStorage.removeItem('miOrganizacion')
                navigate('/')
            }
        })
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarBrand}>
                <img src={logoBrujula} alt="Brújula Social" className={styles.brandLogo} />
                <div>
                    <div className={styles.brandName}>
                        Brújula<span className={styles.brandAccent}>Social</span>
                    </div>
                    <div className={styles.brandSub}>ORGANIZACIÓN</div>
                </div>
            </div>

            <nav className={styles.sidebarNav}>
                <p className={styles.navGroupLabel}>GENERAL</p>
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={`${styles.navItem} ${activeTab === item.id ? styles.navItemActive : ''}`}
                        onClick={() => onTabChange?.(item.id)}
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}

                <p className={styles.navGroupLabel} style={{ marginTop: '24px' }}>AJUSTES</p>
                <button className={styles.navItem} onClick={onEditar}>
                    <span>✏️</span>
                    <span>Editar organización</span>
                </button>
                <button className={styles.navItem} onClick={onEliminar} style={{ color: 'var(--red)' }}>
                    <span>🗑️</span>
                    <span>Eliminar organización</span>
                </button>
            </nav>

            <div className={styles.sidebarFooter}>
                {organizacion && (
                    <div className={styles.adminInfo}>
                        <div className={styles.adminAvatar}>
                            {organizacion.NombreOrganizacion?.substring(0, 2).toUpperCase() || 'OR'}
                        </div>
                        <div>
                            <div className={styles.adminName}>
                                {organizacion.NombreOrganizacion?.split(' ')[0] || 'Organización'}
                            </div>
                            <div className={styles.adminRole}>Organización</div>
                        </div>
                    </div>
                )}
                <button className={styles.navItem} onClick={handleCerrarSesion} style={{ color: '#f87171' }}>
                    <span>🚪</span>
                    <span>Cerrar sesión</span>
                </button>
            </div>
        </aside>
    )
}
