import { useState } from 'react'
import BuscadorOrganizaciones from '../Buscador/BuscadorOrganizaciones'
import styles from './BuscadorPublico.module.css'

function BuscadorPublico() {
    const [filtros, setFiltros] = useState({
        idCategoria: '',
        IdProvincia: '',
        idDisponibilidad: ''
    })

    function manejoCambioFiltro(campo, valor) {
        setFiltros((prev) => ({ ...prev, [campo]: valor }))
    }

    return (
        <div className={styles.page}>

            <div className={styles.banner}>
                <div className={styles.bannerContent}>
                    <h1 className={styles.bannerTitle}>
                        Encontrá tu causa en<br />
                        <span className={styles.bannerAccent}>Costa Rica</span>
                    </h1>
                    <div className={styles.bannerStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statNum}>100%</span>
                            <span className={styles.statLabel}>Gratuito</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNum}>7</span>
                            <span className={styles.statLabel}>Provincias</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNum}>5+</span>
                            <span className={styles.statLabel}>Categorías</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.body}>
                <BuscadorOrganizaciones
                    filtros={filtros}
                    onFiltroChange={manejoCambioFiltro}
                    modoPublico
                />
            </div>

        </div>
    )
}

export default BuscadorPublico
