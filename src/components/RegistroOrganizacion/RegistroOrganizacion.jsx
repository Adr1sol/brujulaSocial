import React, { useState } from 'react'
import styles from './RegistroOrganizacion.module.css'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import logo from '../../images/LogoEntero.png'

function RegistroOrganizacion() {

    const [nombreOrganizacion, setNombreOrganizacion] = useState("")
    const [correoOrganizacion, setCorreoOrganizacion] = useState("") // <--- Nuevo estado
    const [idCategoria, setIdCategoria] = useState("")
    const [idProvincia, setIdProvincia] = useState("")
    const [idDisponibilidad, setIdDisponibilidad] = useState("")
    const [descripcion, setDescripcion] = useState("")

    const navigate = useNavigate()

    function limpiarFormulario() {
        setNombreOrganizacion("")
        setCorreoOrganizacion("") // <--- Limpiar correo
        setIdCategoria("")
        setIdProvincia("")
        setIdDisponibilidad("")
        setDescripcion("")
    }

    async function guardarOrganizacion() {
        // Validamos que el correo también esté lleno
        if (!nombreOrganizacion || !correoOrganizacion || !idCategoria || !idProvincia || !idDisponibilidad || !descripcion) {
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
            CorreoContacto: correoOrganizacion, // <--- Enviamos el correo al servicio
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
        <div className={styles.page}>

            {/* ── Barra superior ── */}
            <header className={styles.topbar}>
                <img src={logo} alt="Brújula Social" className={styles.logo} />
                <Link to="/" className={styles.homeBtn}>
                    <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Inicio
                </Link>
            </header>

            {/* --- Nuevo campo de Correo --- */}
            <p>Correo de contacto</p>
            <input
                type="email"
                value={correoOrganizacion}
                onChange={(e) => setCorreoOrganizacion(e.target.value)}
                placeholder="ejemplo@organizacion.org"
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

            {/* ── Tarjeta ── */}
            <div className={styles.card}>
                <div className={styles.form}>

                    {/* Nombre */}
                    <div className={styles.inputGroup}>
                        <label>Nombre de la organización</label>
                        <input
                            type="text"
                            value={nombreOrganizacion}
                            onChange={(e) => setNombreOrganizacion(e.target.value)}
                            placeholder="Ej: Fundación Verde"
                        />
                    </div>

                    <div className={styles.divider} />

                    {/* Categoría + Provincia en la misma fila */}
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label>Categoría</label>
                            <select value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)}>
                                <option value="">Seleccionar</option>
                                <option value="1">Medio Ambiente</option>
                                <option value="2">Educación</option>
                                <option value="3">Salud</option>
                                <option value="4">Bienestar Animal</option>
                                <option value="5">Cultura</option>
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Provincia</label>
                            <select value={idProvincia} onChange={(e) => setIdProvincia(e.target.value)}>
                                <option value="">Seleccionar</option>
                                <option value="1">San José</option>
                                <option value="2">Alajuela</option>
                                <option value="3">Cartago</option>
                                <option value="4">Heredia</option>
                                <option value="5">Guanacaste</option>
                                <option value="6">Puntarenas</option>
                                <option value="7">Limón</option>
                            </select>
                        </div>
                    </div>

                    {/* Disponibilidad */}
                    <div className={styles.inputGroup}>
                        <label>Disponibilidad requerida</label>
                        <select value={idDisponibilidad} onChange={(e) => setIdDisponibilidad(e.target.value)}>
                            <option value="">Seleccionar disponibilidad</option>
                            <option value="1">Fines de semana</option>
                            <option value="2">Por horas</option>
                            <option value="3">Remoto</option>
                            <option value="4">Entre semana</option>
                        </select>
                    </div>

                    <div className={styles.divider} />

                    {/* Descripción */}
                    <div className={styles.inputGroup}>
                        <label>Descripción</label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Describí brevemente la misión y actividades de tu organización..."
                        />
                    </div>

                    {/* Botón */}
                    <button className={styles.submitBtn} onClick={guardarOrganizacion}>
                        Registrar organización
                    </button>

                </div>
            </div>

        </div>
    )
}

export default RegistroOrganizacion