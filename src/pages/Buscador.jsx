import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BuscadorOrganizaciones from '../components/Buscador/BuscadorOrganizaciones'
import PerfilSidebar from '../components/PerfilVoluntario/PerfilSidebar'
import styles from '../components/PerfilVoluntario/PerfilVoluntario.module.css'

function Buscador() {

    const [filtros, setFiltros] = useState({
        idCategoria: '',
        IdProvincia: '',
        idDisponibilidad: ''
    })

    function manejoCambioFiltro(campo, valor) {
        setFiltros((prev) => ({ ...prev, [campo]: valor }))
    }

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    const handleCerrarSesion = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('miOrganizacion');
        navigate('/');
    };

    const handleEditarPerfil = () => {
        navigate('/perfil');
    };

    const handleEliminarCuenta = () => {
        // Casi siempre mejor hacer esto desde el propio perfil, pero redirigimos a /perfil para flujo completo
        navigate('/perfil');
    };

    return (
        <div className={styles.layout}>
            <PerfilSidebar
                user={user}
                activeTab="organizaciones"
                onTabChange={() => navigate('/perfil')}
                onEditarPerfil={handleEditarPerfil}
                onCerrarSesion={handleCerrarSesion}
                onEliminarCuenta={handleEliminarCuenta}
            />

            <main className={styles.main}>
                <header className={styles.topbar}>
                    <div className={styles.topbarLeft}>
                        <div className={styles.breadcrumb}>
                            <span className={styles.breadcrumbRoot}>Inicio</span>
                            <span className={styles.breadcrumbSep}>/</span>
                            <span className={styles.breadcrumbCurrent}>Organizaciones</span>
                        </div>
                        <h1 className={styles.pageTitle}>Organizaciones</h1>
                    </div>
                    <div className={styles.topbarRight}>
                        <div className={styles.adminPill}>
                            <span className={styles.adminPillDot} />
                            Activo
                        </div>
                    </div>
                </header>

                <div className={styles.pageContent}>
                    <BuscadorOrganizaciones
                        filtros={filtros}
                        onFiltroChange={manejoCambioFiltro}
                    />
                </div>
            </main>
        </div>
    )
}

export default Buscador