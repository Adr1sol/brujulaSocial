import React, { useState } from 'react'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function RegistroOrganizacion() {

    const [nombreOrganizacion, setNombreOrganizacion] = useState("")
    const [idCategoria, setIdCategoria] = useState("")
    const [idProvincia, setIdProvincia] = useState("")
    const [idDisponibilidad, setIdDisponibilidad] = useState("")
    const [descripcion, setDescripcion] = useState("")

    const navigate = useNavigate()

    function limpiarFormulario() {
        setNombreOrganizacion("")
        setIdCategoria("")
        setIdProvincia("")
        setIdDisponibilidad("")
        setDescripcion("")
    }

    async function guardarOrganizacion() {

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

        const registrada = await ServiceOrganizaciones.postOrganizaciones(objOrganizacion)

        if (registrada) {
            localStorage.setItem("miOrganizacion", JSON.stringify(registrada))

            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: 'Tu organización ha sido registrada correctamente.',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                navigate("/miOrganizacion")
            })

            limpiarFormulario()

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar',
                text: 'No se pudo registrar la organización. Intentá de nuevo.',
                confirmButtonColor: '#EF8514'
            })
        }
    }

    return (
        <div>
            <h2>Registrar Organización</h2>

            <p>Nombre de la organización</p>
            <input
                type="text"
                value={nombreOrganizacion}
                onChange={(e) => setNombreOrganizacion(e.target.value)}
                placeholder="Nombre de la organización"
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
                placeholder="Breve descripción de la organización"
            />

            <button onClick={guardarOrganizacion}>Agregar</button>
        </div>
    )
}

export default RegistroOrganizacion