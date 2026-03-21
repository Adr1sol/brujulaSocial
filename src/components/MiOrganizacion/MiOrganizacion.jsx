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

    // Estado para controlar el modal
    const [voluntarioSeleccionado, setVoluntarioSeleccionado] = useState(null)

    const navigate = useNavigate()

    async function cargarDatos() {

        const miOrg = JSON.parse(localStorage.getItem("miOrganizacion"))
        if (!miOrg) return
        setOrganizacion(miOrg)

        const categorias = await ServiceCategorias.getCategorias()
        const provincias = await ServiceProvincias.getProvincias()
        const disponibilidades = await ServiceDisponibilidades.getDisponibilidades()

        const cat = categorias.find((c) => parseInt(c.id) === parseInt(miOrg.idCategoria))
        const prov = provincias.find((p) => parseInt(p.id) === parseInt(miOrg.IdProvincia))
        const disp = disponibilidades.find((d) => parseInt(d.id) === parseInt(miOrg.idDisponibilidad))

        setCategoriaNombre(cat ? cat.NombreCategoria : "Sin categoría")
        setProvinciaNombre(prov ? prov.NombreProvincia : "Sin provincia")
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
            return {
                ...usuario,
                FechaAplicacion: aplicacion.FechaAplicacion
            }
        })

        setVoluntarios(voluntariosDeLaOrg)
    }

    useEffect(() => {
        cargarDatos()
    }, [])


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
            Swal.fire({
                icon: 'error',
                title: 'Formulario incompleto',
                text: 'Todos los campos deben estar llenos.',
                confirmButtonColor: '#EF8514'
            })
            return
        }

        const objOrganizacion = {
            NombreOrganizacion: nombreOrganizacion,
            idCategoria: parseInt(idCategoria),
            IdProvincia: parseInt(idProvincia),
            idDisponibilidad: parseInt(idDisponibilidad),
            Descripcion: descripcion
        }

        const actualizada = await ServiceOrganizaciones.putOrganizaciones(objOrganizacion, organizacion.id)

        if (actualizada) {
            localStorage.setItem("miOrganizacion", JSON.stringify(actualizada))
            setOrganizacion(actualizada)
            setEditando(false)

            Swal.fire({
                icon: 'success',
                title: '¡Actualización exitosa!',
                text: 'Tu organización fue actualizada correctamente.',
                timer: 2000,
                showConfirmButton: false
            })

            cargarDatos()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar',
                text: 'No se pudo actualizar la organización. Intentá de nuevo.',
                confirmButtonColor: '#EF8514'
            })
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
                setOrganizacion(null)

                Swal.fire({
                    icon: 'success',
                    title: 'Organización eliminada',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    navigate("/register")
                })
            }
        })
    }

    return (
        <div>

            {organizacion ? (
                <div>

                    {/* Formulario de edición */}
                    {editando ? (
                        <div>
                            <h2>Editar Organización</h2>

                            <p>Nombre de la organización</p>
                            <input
                                type="text"
                                value={nombreOrganizacion}
                                onChange={(e) => setNombreOrganizacion(e.target.value)}
                            />

                            <p>Categoría</p>
                            <select value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)}>
                                <option value="">Seleccionar categoría</option>
                                <option value="1">Medio Ambiente</option>
                                <option value="2">Educación</option>
                                <option value="3">Salud</option>
                                <option value="4">Bienestar Animal</option>
                                <option value="5">Cultura</option>
                            </select>

                            <p>Provincia</p>
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

                            <p>Disponibilidad</p>
                            <select value={idDisponibilidad} onChange={(e) => setIdDisponibilidad(e.target.value)}>
                                <option value="">Seleccionar disponibilidad</option>
                                <option value="1">Fines de semana</option>
                                <option value="2">Por horas</option>
                                <option value="3">Remoto</option>
                                <option value="4">Entre semana</option>
                            </select>

                            <p>Descripción</p>
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />

                            <button onClick={handleGuardarCambios}>Guardar cambios</button>
                            <button onClick={handleCancelar}>Cancelar</button>
                        </div>

                    ) : (

                        // Perfil de la organización
                        <div>
                            <h2>Mi Organización</h2>
                            <p><strong>Nombre:</strong> {organizacion.NombreOrganizacion}</p>
                            <p><strong>Descripción:</strong> {organizacion.Descripcion}</p>
                            <p><strong>Categoría:</strong> {categoriaNombre}</p>
                            <p><strong>Provincia:</strong> {provinciaNombre}</p>
                            <p><strong>Disponibilidad:</strong> {disponibilidadNombre}</p>

                            <button onClick={handleEditar}>Editar</button>
                            <button onClick={handleEliminar}>Eliminar</button>
                        </div>
                    )}

                    {/* Lista de voluntarios */}
                    {!editando && (
                        <div>
                            <h3>Voluntarios que aplicaron</h3>
                            {voluntarios.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Correo</th>
                                            <th>Fecha de aplicación</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {voluntarios.map((vol, index) => (
                                            <tr key={index}>
                                                <td>{vol.Nombre}</td>
                                                <td>{vol.Correo}</td>
                                                <td>{vol.FechaAplicacion}</td>
                                                <td>
                                                    <button onClick={() => setVoluntarioSeleccionado(vol)}>
                                                        Ver perfil
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>Aún no hay voluntarios que hayan aplicado a tu organización.</p>
                            )}
                        </div>
                    )}

                </div>
            ) : (
                <p>No hay organización registrada. <a href="/register">Registrá tu organización aquí.</a></p>
            )}

            {/* Modal del voluntario */}
            {voluntarioSeleccionado && (
                <ModalVoluntario
                    voluntario={voluntarioSeleccionado}
                    onCerrar={() => setVoluntarioSeleccionado(null)}
                />
            )}

        </div>
    )
}

export default PerfilOrganizacion