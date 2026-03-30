import { useState, useEffect, useMemo } from 'react'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'
import ServiceCategorias from '../../services/ServiceCategorias'
import ServiceProvincias from '../../services/ServiceProvincias'
import ServiceDisponibilidades from '../../services/ServiceDisponibilidades'
import ServiceVoluntariado from '../../services/ServiceVoluntariado'
import FiltrosOrganizaciones from '../Filtros/FiltrosOrganizaciones'
import { useNavigate } from 'react-router-dom'
import styles from './Buscador.module.css'
import Swal from 'sweetalert2'

const COLORES = ["#1D9E75", "#E8841A", "#185FA5", "#534AB7", "#3B6D11", "#D4537E"]

function BuscadorOrganizaciones({ filtros, onFiltroChange, modoPublico }) {

    const [organizaciones, setOrganizaciones] = useState([])
    const [categorias, setCategorias] = useState([])
    const [provincias, setProvincias] = useState([])
    const [disponibilidades, setDisponibilidades] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function cargarDatos() {
            const todasLasOrgs             = await ServiceOrganizaciones.getOrganizaciones()
            const todasLasCategorias       = await ServiceCategorias.getCategorias()
            const todasLasProvincias       = await ServiceProvincias.getProvincias()
            const todasLasDisponibilidades = await ServiceDisponibilidades.getDisponibilidades()

            setOrganizaciones(todasLasOrgs)
            setCategorias(todasLasCategorias)
            setProvincias(todasLasProvincias)
            setDisponibilidades(todasLasDisponibilidades)
        }
        cargarDatos()
    }, [])

    const organizacionesFiltradas = useMemo(() => {
        return organizaciones.filter((org) => {
            const matchCategoria      = filtros.idCategoria      ? String(org.idCategoria)      === String(filtros.idCategoria)      : true
            const matchProvincia      = filtros.IdProvincia      ? String(org.IdProvincia)      === String(filtros.IdProvincia)      : true
            const matchDisponibilidad = filtros.idDisponibilidad ? String(org.idDisponibilidad) === String(filtros.idDisponibilidad) : true
            return matchCategoria && matchProvincia && matchDisponibilidad
        })
    }, [organizaciones, filtros])

    function getNombreCategoria(idCategoria) {
        const cat = categorias.find((c) => String(c.id) === String(idCategoria))
        return cat ? cat.NombreCategoria : 'Sin categoría'
    }

    function getNombreProvincia(IdProvincia) {
        const prov = provincias.find((p) => String(p.id) === String(IdProvincia))
        return prov ? prov.NombreProvincia : 'Sin provincia'
    }

    function getNombreDisponibilidad(idDisponibilidad) {
        const disp = disponibilidades.find((d) => String(d.id) === String(idDisponibilidad))
        return disp ? disp.NombreDisponibilidad : 'Sin disponibilidad'
    }

    function getIniciales(nombre) {
        if (!nombre) return "??"
        const partes = nombre.split(" ")
        return partes.length >= 2
            ? partes[0][0] + partes[1][0]
            : nombre.substring(0, 2).toUpperCase()
    }

    async function handleAplicar(org) {
        const user = JSON.parse(localStorage.getItem("user"))

        if (!user) {
            navigate("/registro")
            return
        }

        const todasLasAplicaciones = await ServiceVoluntariado.getVoluntariado()
        const yaAplico = todasLasAplicaciones.find(
            (a) => String(a.idUsuario) === String(user.id) &&
                   String(a.idOrganizacion) === String(org.id)
        )

        if (yaAplico) {
            Swal.fire({
                icon: 'info',
                title: 'Ya aplicaste',
                text: `Ya te registraste en ${org.NombreOrganizacion}.`,
                confirmButtonColor: '#E8841A'
            })
            return
        }

        const nuevaAplicacion = {
            idUsuario: user.id,
            idOrganizacion: org.id,
            FechaAplicacion: new Date().toISOString().split('T')[0]
        }

        const resultado = await ServiceVoluntariado.postVoluntariado(nuevaAplicacion)

        if (resultado) {
            Swal.fire({
                icon: 'success',
                title: '¡Aplicación exitosa!',
                text: `Te registraste correctamente en ${org.NombreOrganizacion}.`,
                timer: 2000,
                showConfirmButton: false
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al aplicar',
                text: 'No se pudo registrar tu aplicación. Intentá de nuevo.',
                confirmButtonColor: '#EF8514'
            })
        }
    }

    if (modoPublico) {
        return (
            <div className={styles.pagina}>
                <FiltrosOrganizaciones filtros={filtros} onFiltroChange={onFiltroChange} modoPublico />
                <div className={styles.wrapPublico}>
                    {organizacionesFiltradas.length === 0 ? (
                        <div className={styles.emptyStatePublico}>
                            <div className={styles.emptyIcon}>🔍</div>
                            <p>No se encontraron organizaciones con los filtros seleccionados.</p>
                        </div>
                    ) : (
                        organizacionesFiltradas.map((org, i) => (
                            <div key={org.id} className={styles.orgCardPublico}>
                                <div className={styles.cardHeaderPublico}>
                                    <div className={styles.orgAvatarPublico} style={{ background: COLORES[i % COLORES.length] }}>
                                        {getIniciales(org.NombreOrganizacion)}
                                    </div>
                                    <div className={styles.orgNombrePublico}>{org.NombreOrganizacion}</div>
                                </div>
                                <div className={styles.orgBodyPublico}>
                                    <div className={styles.orgDescPublico}>{org.Descripcion}</div>
                                    {org.CorreoContacto && (
                                        <div className={styles.orgCorreoPublico}>
                                            ✉️ <a href={`mailto:${org.CorreoContacto}`}>{org.CorreoContacto}</a>
                                        </div>
                                    )}
                                    <div className={styles.orgTagsPublico}>
                                        <span className={styles.orgTagPublico}>🏷️ {getNombreCategoria(org.idCategoria)}</span>
                                        <span className={styles.orgTagPublico}>📍 {getNombreProvincia(org.IdProvincia)}</span>
                                        <span className={styles.orgTagPublico}>⏰ {getNombreDisponibilidad(org.idDisponibilidad)}</span>
                                    </div>
                                </div>
                                <div className={styles.orgAccionPublico}>
                                    <button className={styles.btnAplicarPublico} onClick={() => handleAplicar(org)}>
                                        Aplicar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.pagina}>
            <FiltrosOrganizaciones filtros={filtros} onFiltroChange={onFiltroChange} />
            <div className={styles.wrap}>
                {organizacionesFiltradas.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>🔍</div>
                        <p>No se encontraron organizaciones con los filtros seleccionados.</p>
                    </div>
                ) : (
                    organizacionesFiltradas.map((org, i) => (
                        <div key={org.id} className={styles.orgCard}>
                            <div className={styles.orgAvatar} style={{ background: COLORES[i % COLORES.length] }}>
                                {getIniciales(org.NombreOrganizacion)}
                            </div>
                            <div className={styles.orgBody}>
                                <div className={styles.orgNombre}>{org.NombreOrganizacion}</div>
                                <div className={styles.orgDesc}>{org.Descripcion}</div>
                                {org.CorreoContacto && (
                                    <div className={styles.orgCorreo}>
                                        ✉️ <a href={`mailto:${org.CorreoContacto}`}>{org.CorreoContacto}</a>
                                    </div>
                                )}
                                <div className={styles.orgTags}>
                                    <span className={styles.orgTag}>🏷️ {getNombreCategoria(org.idCategoria)}</span>
                                    <span className={styles.orgTag}>📍 {getNombreProvincia(org.IdProvincia)}</span>
                                    <span className={styles.orgTag}>⏰ {getNombreDisponibilidad(org.idDisponibilidad)}</span>
                                </div>
                            </div>
                            <div className={styles.orgAccion}>
                                <button className={styles.btnAplicar} onClick={() => handleAplicar(org)}>
                                    Aplicar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default BuscadorOrganizaciones