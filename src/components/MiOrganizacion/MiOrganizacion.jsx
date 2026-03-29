import React, { useState, useEffect } from 'react'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'
import ServiceVoluntariado from '../../services/ServiceVoluntariado'
import ServiceUsuario from '../../services/ServiceUsuario'
import ServiceCategorias from '../../services/ServiceCategorias'
import ServiceProvincias from '../../services/ServiceProvincias'
import ServiceDisponibilidades from '../../services/ServiceDisponibilidades'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ModalVoluntario from './ModalVoluntario'
import ModalRegistroHoras from './ModalRegistroHoras'
import styles from "./MiOrganizacion.module.css"

const COLORES = ["#1D9E75", "#E8841A", "#185FA5", "#534AB7", "#3B6D11", "#D4537E"]

function getIniciales(nombre) {
    if (!nombre) return "??"
    const partes = nombre.split(" ")
    return partes.length >= 2
        ? partes[0][0] + partes[1][0]
        : nombre.substring(0, 2).toUpperCase()
}

function PerfilOrganizacion() {

    const [organizacion, setOrganizacion] = useState(null)
    const [voluntarios, setVoluntarios] = useState([])
    const [categoriaNombre, setCategoriaNombre] = useState("")
    const [provinciaNombre, setProvinciaNombre] = useState("")
    const [disponibilidadNombre, setDisponibilidadNombre] = useState("")

    const [editando, setEditando] = useState(false)
    const [nombreOrganizacion, setNombreOrganizacion] = useState("")
    const [idCategoria, setIdCategoria] = useState("")
    const [idProvincia, setIdProvincia] = useState("")
    const [idDisponibilidad, setIdDisponibilidad] = useState("")
    const [descripcion, setDescripcion] = useState("")

    const [voluntarioSeleccionado, setVoluntarioSeleccionado] = useState(null)
    const [voluntarioParaHoras, setVoluntarioParaHoras] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        cargarDatos()
    }, [])

    async function cargarDatos() {
        const user = JSON.parse(localStorage.getItem("user") || "null")
        if (!user || !user.idOrganizacion) return

        const todasLasOrgs = await ServiceOrganizaciones.getOrganizaciones()
        const miOrg = todasLasOrgs.find(
            (o) => String(o.id) === String(user.idOrganizacion)
        )
        if (!miOrg) return

        localStorage.setItem("miOrganizacion", JSON.stringify(miOrg))
        setOrganizacion(miOrg)

        const categorias       = await ServiceCategorias.getCategorias()
        const provincias       = await ServiceProvincias.getProvincias()
        const disponibilidades = await ServiceDisponibilidades.getDisponibilidades()

        const cat  = categorias.find((c) => parseInt(c.id) === parseInt(miOrg.idCategoria))
        const prov = provincias.find((p) => parseInt(p.id) === parseInt(miOrg.IdProvincia))
        const disp = disponibilidades.find((d) => parseInt(d.id) === parseInt(miOrg.idDisponibilidad))

        setCategoriaNombre(cat  ? cat.NombreCategoria         : "Sin categoría")
        setProvinciaNombre(prov ? prov.NombreProvincia        : "Sin provincia")
        setDisponibilidadNombre(disp ? disp.NombreDisponibilidad : "Sin disponibilidad")

        const todasLasAplicaciones = await ServiceVoluntariado.getVoluntariado()
        const aplicacionesDeLaOrg = todasLasAplicaciones.filter(
            (a) => String(a.idOrganizacion) === String(miOrg.id)
        )

        const todosLosUsuarios = await ServiceUsuario.getUsuarios()
        const voluntariosDeLaOrg = aplicacionesDeLaOrg.map((aplicacion) => {
            const usuario = todosLosUsuarios.find(
                (u) => String(u.id) === String(aplicacion.idUsuario)
            )
            return { ...usuario, FechaAplicacion: aplicacion.FechaAplicacion }
        }).filter(v => v && v.Nombre)

        setVoluntarios(voluntariosDeLaOrg)
    }

    function handleEditar() {
        setNombreOrganizacion(organizacion.NombreOrganizacion)
        setIdCategoria(organizacion.idCategoria)
        setIdProvincia(organizacion.IdProvincia)
        setIdDisponibilidad(organizacion.idDisponibilidad)
        setDescripcion(organizacion.Descripcion)
        setEditando(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function handleCancelar() {
        setEditando(false)
        setNombreOrganizacion("")
        setIdCategoria("")
        setIdProvincia("")
        setIdDisponibilidad("")
        setDescripcion("")
    }

    async function handleGuardarCambios() {
        if (!nombreOrganizacion || !idCategoria || !idProvincia || !idDisponibilidad || !descripcion) {
            Swal.fire({ icon: 'error', title: 'Formulario incompleto', text: 'Todos los campos deben estar llenos.', confirmButtonColor: '#EF8514' })
            return
        }

        const objOrganizacion = {
            NombreOrganizacion: nombreOrganizacion,
            idCategoria:        parseInt(idCategoria),
            IdProvincia:        parseInt(idProvincia),
            idDisponibilidad:   parseInt(idDisponibilidad),
            Descripcion:        descripcion
        }

        const actualizada = await ServiceOrganizaciones.putOrganizaciones(objOrganizacion, organizacion.id)

        if (actualizada) {
            localStorage.setItem("miOrganizacion", JSON.stringify(actualizada))
            setOrganizacion(actualizada)
            setEditando(false)
            Swal.fire({ icon: 'success', title: '¡Actualización exitosa!', text: 'Tu organización fue actualizada correctamente.', timer: 2000, showConfirmButton: false })
            cargarDatos()
        } else {
            Swal.fire({ icon: 'error', title: 'Error al actualizar', text: 'No se pudo actualizar la organización. Intentá de nuevo.', confirmButtonColor: '#EF8514' })
        }
    }

    async function handleEliminar() {
        Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará tu organización permanentemente.',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#078A87'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await ServiceOrganizaciones.deleteOrganizaciones(organizacion.id)
                localStorage.removeItem("miOrganizacion")
                localStorage.removeItem("user")
                setOrganizacion(null)
                Swal.fire({ icon: 'success', title: 'Organización eliminada', timer: 2000, showConfirmButton: false })
                    .then(() => navigate("/register"))
            }
        })
    }

    return (
        <div className={styles.pagina}>
            <div className={styles.contenido}>

                {organizacion ? (
                    <>
                        {/* ── Card principal de la organización ── */}
                        <div className={styles.heroCard}>
                            <div className={styles.heroHeader}>
                                <div className={styles.orgAvatarWrap}>
                                    <div className={styles.orgAvatar}>
                                        {getIniciales(organizacion.NombreOrganizacion)}
                                    </div>
                                    <div className={styles.orgTitleGroup}>
                                        <h2>{organizacion.NombreOrganizacion}</h2>
                                        {organizacion.CorreoContacto && (
                                            <span className={styles.correoLabel}>✉ {organizacion.CorreoContacto}</span>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.heroStats}>
                                    <div className={styles.heroStat}>
                                        <div className={styles.heroStatN}>{voluntarios.length}</div>
                                        <div className={styles.heroStatL}>Voluntarios</div>
                                    </div>
                                    <div className={styles.heroDivider}></div>
                                    <div className={styles.heroStat}>
                                        <div className={styles.heroStatN}>{organizacion.id}</div>
                                        <div className={styles.heroStatL}>ID Org.</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.heroTags}>
                                <span className={`${styles.heroTag} ${styles.teal}`}>🏷️ {categoriaNombre}</span>
                                <span className={`${styles.heroTag} ${styles.orange}`}>📍 {provinciaNombre}</span>
                                <span className={`${styles.heroTag} ${styles.green}`}>⏰ {disponibilidadNombre}</span>
                            </div>

                            <div className={styles.heroDesc}>
                                <h4>Descripción</h4>
                                <p>{organizacion.Descripcion}</p>
                            </div>

                            <div className={styles.heroActions}>
                                <button className={styles.btnEditar} onClick={handleEditar}>
                                    ✏️ Editar información
                                </button>
                                <button className={styles.btnEliminar} onClick={handleEliminar}>
                                    🗑 Eliminar organización
                                </button>
                            </div>
                        </div>

                        {/* ── Formulario de edición ── */}
                        {editando && (
                            <div className={styles.editCard}>
                                <div className={styles.editCardHeader}>
                                    <h3>Editar organización</h3>
                                </div>
                                <div className={styles.editCardBody}>
                                    <div className={styles.editGrid}>
                                        <div className={styles.editGroup}>
                                            <label>Nombre de la organización</label>
                                            <input type="text" value={nombreOrganizacion} onChange={(e) => setNombreOrganizacion(e.target.value)} />
                                        </div>
                                        <div className={styles.editGroup}>
                                            <label>Categoría</label>
                                            <select value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)}>
                                                <option value="">Seleccionar categoría</option>
                                                <option value="1">Medio Ambiente</option>
                                                <option value="2">Educación</option>
                                                <option value="3">Salud</option>
                                                <option value="4">Bienestar Animal</option>
                                                <option value="5">Cultura</option>
                                            </select>
                                        </div>
                                        <div className={styles.editGroup}>
                                            <label>Provincia</label>
                                            <select value={idProvincia} onChange={(e) => setIdProvincia(e.target.value)}>
                                                <option value="">Seleccionar provincia</option>
                                                <option value="1">San José</option>
                                                <option value="2">Alajuela</option>
                                                <option value="3">Cartago</option>
                                                <option value="4">Heredia</option>
                                                <option value="5">Guanacaste</option>
                                                <option value="6">Puntarenas</option>
                                                <option value="7">Limón</option>
                                            </select>
                                        </div>
                                        <div className={styles.editGroup}>
                                            <label>Disponibilidad</label>
                                            <select value={idDisponibilidad} onChange={(e) => setIdDisponibilidad(e.target.value)}>
                                                <option value="">Seleccionar disponibilidad</option>
                                                <option value="1">Fines de semana</option>
                                                <option value="2">Por horas</option>
                                                <option value="3">Remoto</option>
                                                <option value="4">Entre semana</option>
                                            </select>
                                        </div>
                                        <div className={`${styles.editGroup} ${styles.fullWidth}`}>
                                            <label>Descripción</label>
                                            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.editCardFooter}>
                                    <button className={styles.btnCancelar} onClick={handleCancelar}>Cancelar</button>
                                    <button className={styles.btnGuardar} onClick={handleGuardarCambios}>Guardar cambios</button>
                                </div>
                            </div>
                        )}

                        {/* ── Tabla de voluntarios ── */}
                        <div className={styles.voluntariosCard}>
                            <div className={styles.voluntariosHeader}>
                                <h3>Voluntarios que aplicaron</h3>
                                <span className={styles.badge}>{voluntarios.length} voluntarios</span>
                            </div>

                            {voluntarios.length > 0 ? (
                                <div className={styles.tablaWrap}>
                                    <table className={styles.tabla}>
                                        <thead>
                                            <tr>
                                                <th>Voluntario</th>
                                                <th>Correo</th>
                                                <th>Fecha de aplicación</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {voluntarios.map((vol, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className={styles.tdUser}>
                                                            <div
                                                                className={styles.avatarSm}
                                                                style={{ background: COLORES[index % COLORES.length] }}
                                                            >
                                                                {getIniciales(vol.Nombre)}
                                                            </div>
                                                            <span>{vol.Nombre}</span>
                                                        </div>
                                                    </td>
                                                    <td>{vol.Correo}</td>
                                                    <td>
                                                        <span className={styles.fechaBadge}>
                                                            📅 {vol.FechaAplicacion}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className={styles.accionesTd}>
                                                            <button className={styles.btnVerPerfil} onClick={() => setVoluntarioSeleccionado(vol)}>
                                                                Ver perfil
                                                            </button>
                                                            <button className={styles.btnHoras} onClick={() => setVoluntarioParaHoras(vol)}>
                                                                + Horas
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className={styles.emptyState}>
                                    <div className={styles.emptyIcon}>🤝</div>
                                    <p>Aún no hay voluntarios que hayan aplicado a tu organización.</p>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className={styles.sinOrg}>
                        <p>No hay organización registrada.</p>
                        <a href="/register">Registrá tu organización aquí →</a>
                    </div>
                )}

            </div>

            {voluntarioSeleccionado && (
                <ModalVoluntario
                    voluntario={voluntarioSeleccionado}
                    onCerrar={() => setVoluntarioSeleccionado(null)}
                />
            )}

            {voluntarioParaHoras && (
                <ModalRegistroHoras
                    voluntario={voluntarioParaHoras}
                    idOrganizacion={organizacion.id}
                    onCerrar={() => setVoluntarioParaHoras(null)}
                />
            )}
        </div>
    )
}

export default PerfilOrganizacion