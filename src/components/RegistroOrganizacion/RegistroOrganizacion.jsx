import React, { useState } from 'react'
import styles from './RegistroOrganizacion.module.css'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'

import ServiceUsuario from '../../services/ServiceUsuario'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import logo from '../../images/LogoEntero.png'

function RegistroOrganizacion() {

    const [nombreOrganizacion, setNombreOrganizacion] = useState("")
    const [correoOrganizacion, setCorreoOrganizacion] = useState("")
    const [contrasena, setContrasena] = useState("")
    const [confirmarContrasena, setConfirmarContrasena] = useState("")
    const [idCategoria, setIdCategoria] = useState("")
    const [idProvincia, setIdProvincia] = useState("")
    const [idDisponibilidad, setIdDisponibilidad] = useState("")
    const [descripcion, setDescripcion] = useState("")

    const navigate = useNavigate()

    function limpiarFormulario() {
        setNombreOrganizacion("")
        setCorreoOrganizacion("")
        setContrasena("")
        setConfirmarContrasena("")
        setIdCategoria("")
        setIdProvincia("")
        setIdDisponibilidad("")
        setDescripcion("")
    }

    async function guardarOrganizacion() {

        if (!nombreOrganizacion || !correoOrganizacion || !contrasena || !confirmarContrasena ||
            !idCategoria || !idProvincia || !idDisponibilidad || !descripcion) {
            Swal.fire({
                icon: 'error',
                title: 'Formulario incompleto',
                text: 'Todos los campos deben estar llenos.',
                confirmButtonColor: '#EF8514'
            })
            return
        }

        if (contrasena.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Contraseña débil',
                text: 'La contraseña debe tener al menos 6 caracteres.',
                confirmButtonColor: '#EF8514'
            })
            return
        }

        if (contrasena !== confirmarContrasena) {
            Swal.fire({
                icon: 'error',
                title: 'Error de coincidencia',
                text: 'Las contraseñas no coinciden.',
                confirmButtonColor: '#EF8514'
            })
            return
        }

        // ── 1. POST a /organizaciones ──────────────────────────
        const objOrganizacion = {
            NombreOrganizacion: nombreOrganizacion,
            CorreoContacto: correoOrganizacion,
            idCategoria: parseInt(idCategoria),
            IdProvincia: parseInt(idProvincia),
            idDisponibilidad: parseInt(idDisponibilidad),
            Descripcion: descripcion
        }

        const orgRegistrada = await ServiceOrganizaciones.postOrganizaciones(objOrganizacion)

        if (!orgRegistrada) {
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar',
                text: 'No se pudo registrar la organización. Intentá de nuevo.',
                confirmButtonColor: '#EF8514'
            })
            return
        }

        // ── 2. POST a /usuarios — vincula la org con su cuenta ──
        const objUsuario = {
            Nombre: nombreOrganizacion,
            Correo: correoOrganizacion,
            Contrasena: contrasena,
            Tipo: "organizacion",
            idOrganizacion: orgRegistrada.id,   // ← vincula ambos
            FechaRegistro: new Date().toISOString().split('T')[0]
        }

        const usuarioRegistrado = await ServiceUsuario.postUsuario(objUsuario)

        if (usuarioRegistrado) {
            // Guardar en localStorage para que el navbar y perfil funcionen
            localStorage.setItem("user", JSON.stringify(usuarioRegistrado))
            localStorage.setItem("miOrganizacion", JSON.stringify(orgRegistrada))

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
                title: 'Error al crear cuenta',
                text: 'La organización se registró pero no se pudo crear la cuenta. Contactá soporte.',
                confirmButtonColor: '#EF8514'
            })
        }
    }

    return (
        <div className={styles.wrapper}>

            <p>Nombre de la organización</p>
            <input
                type="text"
                value={nombreOrganizacion}
                onChange={(e) => setNombreOrganizacion(e.target.value)}
                placeholder="Nombre de la organización"
            />
            <p>Correo de contacto</p>
            <input
                type="email"
                value={correoOrganizacion}
                onChange={(e) => setCorreoOrganizacion(e.target.value)}
                placeholder="ejemplo@organizacion.org"
            />

            {/* ✅ Nuevos campos de contraseña */}
            <p>Contraseña</p>
            <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Mínimo 6 caracteres"
            />

            <p>Confirmar contraseña</p>
            <input
                type="password"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                placeholder="Repetí la contraseña"
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

            {/* ── Lado formulario ── */}
            <div className={styles.formSide}>
                <div className={styles.card}>

                    <Link to="/" className={styles.backLink}>← Volver al inicio</Link>

                    <div className={styles.header}>
                        <h2>Crear cuenta</h2>
                        <p className={styles.sub}>Completá los datos de tu organización para comenzar.</p>
                    </div>

                    <div className={styles.form}>

                        <div className={styles.inputGroup}>
                            <label>Nombre de la organización</label>
                            <input
                                type="text"
                                value={nombreOrganizacion}
                                onChange={(e) => setNombreOrganizacion(e.target.value)}
                                placeholder="Nombre de la organización"
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Correo de contacto</label>
                            <input
                                type="email"
                                value={correoOrganizacion}
                                onChange={(e) => setCorreoOrganizacion(e.target.value)}
                                placeholder="ejemplo@organizacion.org"
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label>Contraseña</label>
                                <input
                                    type="password"
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                    placeholder="Mínimo 6 caracteres"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Confirmar contraseña</label>
                                <input
                                    type="password"
                                    value={confirmarContrasena}
                                    onChange={(e) => setConfirmarContrasena(e.target.value)}
                                    placeholder="Repetí la contraseña"
                                />
                            </div>
                        </div>

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

                        <div className={styles.inputGroup}>
                            <label>Disponibilidad</label>
                            <select value={idDisponibilidad} onChange={(e) => setIdDisponibilidad(e.target.value)}>
                                <option value="">Seleccionar disponibilidad</option>
                                <option value="1">Fines de semana</option>
                                <option value="2">Por horas</option>
                                <option value="3">Remoto</option>
                                <option value="4">Entre semana</option>
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Descripción</label>
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Breve descripción de la organización"
                            />
                        </div>

                        <button className={styles.submitBtn} onClick={guardarOrganizacion}>
                            Registrar organización
                        </button>

                    </div>

                    <p className={styles.login}>
                        ¿Ya tenés una cuenta?{" "}
                        <span onClick={() => navigate("/inicio")}>Iniciá sesión →</span>
                    </p>

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
            </div >
        </div>
    )
}

export default RegistroOrganizacion
