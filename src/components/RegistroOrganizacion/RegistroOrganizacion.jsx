import React, { useState, useEffect } from 'react'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'
import { useNavigate } from 'react-router-dom'

function RegistroOrganizacion() {

    const [nombreOrganizacion, setNombreOrganizacion] = useState("")
    const [idCategoria, setIdCategoria] = useState("")
    const [idProvincia, setIdProvincia] = useState("")
    const [idDisponibilidad, setIdDisponibilidad] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [mensaje, setMensaje] = useState("")

    const [organizaciones, setOrganizaciones] = useState([])
    const [organizacionEditando, setOrganizacionEditando] = useState(null)

    const navigate = useNavigate()

    // Cargar organizaciones al montar el componente
    useEffect(() => {
        async function cargarOrganizaciones() {
            const datos = await ServiceOrganizaciones.getOrganizaciones()
            setOrganizaciones(datos)
        }
        cargarOrganizaciones()
    }, [])

    // Aquí se limpia el Formulario
    function limpiarFormulario() {
        setNombreOrganizacion("")
        setIdCategoria("")
        setIdProvincia("")
        setIdDisponibilidad("")
        setDescripcion("")
        setOrganizacionEditando(null)
    }

    // Función para agregar o editar la organización
    async function guardarOrganizacion() {

        // Validación de los campos vacíos
        if (!nombreOrganizacion || !idCategoria || !idProvincia || !idDisponibilidad || !descripcion) {
            setMensaje("Todos los campos deben estar llenos")
            return
        }

        const objOrganizacion = {
            NombreOrganizacion: nombreOrganizacion,
            idCategoria: parseInt(idCategoria),
            IdProvincia: parseInt(idProvincia),
            idDisponibilidad: parseInt(idDisponibilidad),
            Descripcion: descripcion
        }

        // Si hay una organización editando, se va a actualizar con PUT
        if (organizacionEditando) {
            const actualizada = await ServiceOrganizaciones.putOrganizaciones(objOrganizacion, organizacionEditando.id)

            if (actualizada) {
                setMensaje("Organización actualizada exitosamente")
                const datos = await ServiceOrganizaciones.getOrganizaciones()
                setOrganizaciones(datos)
                limpiarFormulario()
            } else {
                setMensaje("Error al actualizar la organización")
            }

            // Si no hay organización editando, se crea con POST
        } else {
            const registrada = await ServiceOrganizaciones.postOrganizaciones(objOrganizacion)

            if (registrada) {
                setMensaje("Organización registrada exitosamente")
                const datos = await ServiceOrganizaciones.getOrganizaciones()
                setOrganizaciones(datos)
                limpiarFormulario()
            } else {
                setMensaje("Error al registrar la organización")
            }
        }

        // Limpiar mensaje después de 2 segundos
        setTimeout(() => {
            setMensaje("")
        }, 2000)
    }

    // Función para cargar los datos de una organización en el formulario
    function cargarOrganizacionEnFormulario(org) {
        setOrganizacionEditando(org)
        setNombreOrganizacion(org.NombreOrganizacion)
        setIdCategoria(org.idCategoria)
        setIdProvincia(org.IdProvincia)
        setIdDisponibilidad(org.idDisponibilidad)
        setDescripcion(org.Descripcion)
    }

    // Función para eliminar una organización
    async function eliminarOrganizacion(id) {
        await ServiceOrganizaciones.deleteOrganizaciones(id)
        setMensaje("Organización eliminada exitosamente")
        const datos = await ServiceOrganizaciones.getOrganizaciones()
        setOrganizaciones(datos)

        setTimeout(() => {
            setMensaje("")
        }, 2000)
    }

    return (
        <div>
            <h2>{organizacionEditando ? "Editar Organización" : "Registrar Organización"}</h2>

            {/* ── Formulario para que llene la organización ── */}
            <div>
                <p>Nombre de la organización</p>
                <input
                    type="text"
                    value={nombreOrganizacion}
                    onChange={(evento) => setNombreOrganizacion(evento.target.value)}
                    placeholder="Nombre de la organización"
                />

                <p>Categoría</p>
                <select
                    value={idCategoria}
                    onChange={(evento) => setIdCategoria(evento.target.value)}
                >
                    <option value="">Seleccionar categoría</option>
                    <option value="1">Medio Ambiente</option>
                    <option value="2">Educación</option>
                    <option value="3">Salud</option>
                    <option value="4">Bienestar Animal</option>
                    <option value="5">Cultura</option>
                </select>

                <p>Provincia</p>
                <select
                    value={idProvincia}
                    onChange={(evento) => setIdProvincia(evento.target.value)}
                >
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
                <select
                    value={idDisponibilidad}
                    onChange={(evento) => setIdDisponibilidad(evento.target.value)}
                >
                    <option value="">Seleccionar disponibilidad</option>
                    <option value="1">Fines de semana</option>
                    <option value="2">Por horas</option>
                    <option value="3">Remoto</option>
                    <option value="4">Entre semana</option>
                </select>

                <p>Descripción</p>
                <textarea
                    value={descripcion}
                    onChange={(evento) => setDescripcion(evento.target.value)}
                    placeholder="Breve descripción de la organización"
                />

                <button onClick={guardarOrganizacion}>
                    {organizacionEditando ? "Guardar cambios" : "Agregar"}
                </button>

                {/* Botón cancelar solo visible cuando se está editando */}
                {organizacionEditando && (
                    <button onClick={limpiarFormulario}>
                        Cancelar
                    </button>
                )}
            </div>

            {/* Mensaje de éxito o error */}
            {mensaje && (
                <p>
                    {mensaje}
                </p>
            )}

            {/* ── Lista de organizaciones que se registran ── */}
            <h3>Organizaciones registradas</h3>

            {organizaciones.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {organizaciones.map((org) => (
                            <tr key={org.id}>
                                <td>{org.NombreOrganizacion}</td>
                                <td>{org.Descripcion}</td>
                                <td>
                                    <button onClick={() => cargarOrganizacionEnFormulario(org)}>
                                        Editar
                                    </button>
                                    <button onClick={() => eliminarOrganizacion(org.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay organizaciones registradas aún.</p>
            )}
        </div>
    )
}

export default RegistroOrganizacion