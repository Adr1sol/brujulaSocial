import React, { useState, useEffect } from 'react'
import ServiceCategorias from '../../services/ServiceCategorias'
import ServiceProvincias from '../../services/ServiceProvincias'
import ServiceDisponibilidades from '../../services/ServiceDisponibilidades'
import styles from './FiltrosOrganizaciones.module.css'

function FiltrosOrganizaciones({ filtros, onFiltroChange, modoPublico }) {

    const [categorias, setCategorias] = useState([])
    const [provincias, setProvincias] = useState([])
    const [disponibilidades, setDisponibilidades] = useState([])

    useEffect(() => {
        async function cargarOpciones() {
            const todasLasCategorias = await ServiceCategorias.getCategorias()
            const todasLasProvincias = await ServiceProvincias.getProvincias()
            const todasLasDisponibilidades = await ServiceDisponibilidades.getDisponibilidades()

            setCategorias(todasLasCategorias)
            setProvincias(todasLasProvincias)
            setDisponibilidades(todasLasDisponibilidades)
        }
        cargarOpciones()
    }, [])

    if (modoPublico) {
        return (
            <div className={styles.filtrosWrapPublico}>
                <div className={styles.filtroGroupPublico}>
                    <label className={styles.filtroLabelPublico}>Categoría</label>
                    <select className={styles.filtroSelectPublico} value={filtros.idCategoria} onChange={(e) => onFiltroChange('idCategoria', e.target.value)}>
                        <option value="">Todas las categorías</option>
                        {categorias.map((cat) => <option key={cat.id} value={cat.id}>{cat.NombreCategoria}</option>)}
                    </select>
                </div>
                <div className={styles.filtroGroupPublico}>
                    <label className={styles.filtroLabelPublico}>Provincia</label>
                    <select className={styles.filtroSelectPublico} value={filtros.IdProvincia} onChange={(e) => onFiltroChange('IdProvincia', e.target.value)}>
                        <option value="">Todas las provincias</option>
                        {provincias.map((prov) => <option key={prov.id} value={prov.id}>{prov.NombreProvincia}</option>)}
                    </select>
                </div>
                <div className={styles.filtroGroupPublico}>
                    <label className={styles.filtroLabelPublico}>Disponibilidad</label>
                    <select className={styles.filtroSelectPublico} value={filtros.idDisponibilidad} onChange={(e) => onFiltroChange('idDisponibilidad', e.target.value)}>
                        <option value="">Toda la disponibilidad</option>
                        {disponibilidades.map((disp) => <option key={disp.id} value={disp.id}>{disp.NombreDisponibilidad}</option>)}
                    </select>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.filtrosWrap}>
            <div className={styles.filtroGroup}>
                <label className={styles.filtroLabel}>Categoría</label>
                <select className={styles.filtroSelect} value={filtros.idCategoria} onChange={(e) => onFiltroChange('idCategoria', e.target.value)}>
                    <option value="">Todas las categorías</option>
                    {categorias.map((cat) => <option key={cat.id} value={cat.id}>{cat.NombreCategoria}</option>)}
                </select>
            </div>
            <div className={styles.filtroGroup}>
                <label className={styles.filtroLabel}>Provincia</label>
                <select className={styles.filtroSelect} value={filtros.IdProvincia} onChange={(e) => onFiltroChange('IdProvincia', e.target.value)}>
                    <option value="">Todas las provincias</option>
                    {provincias.map((prov) => <option key={prov.id} value={prov.id}>{prov.NombreProvincia}</option>)}
                </select>
            </div>
            <div className={styles.filtroGroup}>
                <label className={styles.filtroLabel}>Disponibilidad</label>
                <select className={styles.filtroSelect} value={filtros.idDisponibilidad} onChange={(e) => onFiltroChange('idDisponibilidad', e.target.value)}>
                    <option value="">Toda la disponibilidad</option>
                    {disponibilidades.map((disp) => <option key={disp.id} value={disp.id}>{disp.NombreDisponibilidad}</option>)}
                </select>
            </div>
        </div>
    )
}

export default FiltrosOrganizaciones