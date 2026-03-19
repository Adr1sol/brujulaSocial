
import React, { useState, useEffect } from 'react'
import ServiceVoluntariado from '../../services/ServiceVoluntariado'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'
import ServiceHoras from '../../services/ServiceHoras'

function PerfilVoluntario() {

    const [usuario, setUsuario] = useState(null)
    const [organizaciones, setOrganizaciones] = useState([])
    const [aplicacionesDelUsuario, setAplicacionesDelUsuario] = useState([])
    const [orgsDelUsuario, setOrgsDelUsuario] = useState([])
    const [horasDelUsuario, setHorasDelUsuario] = useState([])

    useEffect(() => {
        cargarDatos()
    }, [])

    async function cargarDatos() {

        const user = JSON.parse(localStorage.getItem("user"))
        setUsuario(user)

        const todasLasAplicaciones = await ServiceVoluntariado.getVoluntariado()
        const aplicacionesFiltradas = todasLasAplicaciones.filter(
            (a) => String(a.idUsuario) === String(user.id)
        )
        setAplicacionesDelUsuario(aplicacionesFiltradas)

        const todasLasOrgs = await ServiceOrganizaciones.getOrganizaciones()
        setOrganizaciones(todasLasOrgs)

        const idsOrgs = [...new Set(aplicacionesFiltradas.map((a) => String(a.idOrganizacion)))]
        const orgsFiltradas = todasLasOrgs.filter(
            (org) => idsOrgs.includes(String(org.id))
        )
        setOrgsDelUsuario(orgsFiltradas)

        const todasLasHoras = await ServiceHoras.getHoras()
        const horasFiltradas = todasLasHoras.filter(
            (h) => String(h.idUsuario) === String(user.id)
        )
        setHorasDelUsuario(horasFiltradas)
    }

    function getNombreOrg(idOrganizacion) {
        const org = organizaciones.find((o) => String(o.id) === String(idOrganizacion))
        return org ? org.NombreOrganizacion : "Organización desconocida"
    }

    function calcularTotalHoras() {
        return horasDelUsuario.reduce((total, h) => total + parseInt(h.horas), 0)
    }

    return (
        <div>
            <h2>Mi Perfil</h2>

            {usuario ? (
                <div>

                    {/* Información personal */}
                    <div>
                        <h3>Información personal</h3>
                        <p><strong>Nombre completo:</strong> {usuario.Nombre}</p>
                        <p><strong>Correo:</strong> {usuario.Correo}</p>
                        <p><strong>Total de horas donadas:</strong> {calcularTotalHoras()} h</p>
                    </div>

                    {/* Historial de horas */}
                    <div>
                        <h3>Historial de horas</h3>
                        {horasDelUsuario.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Actividad</th>
                                        <th>Organización</th>
                                        <th>Fecha</th>
                                        <th>Horas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {horasDelUsuario.map((h) => (
                                        <tr key={h.id}>
                                            <td>{h.actividad}</td>
                                            <td>{getNombreOrg(h.idOrganizacion)}</td>
                                            <td>{h.fecha}</td>
                                            <td>{h.horas} h</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Aún no tenés horas registradas.</p>
                        )}
                    </div>

                    {/* Historial de aplicaciones */}
                    <div>
                        <h3>Historial de voluntariado</h3>
                        {aplicacionesDelUsuario.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Organización</th>
                                        <th>Fecha de aplicación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {aplicacionesDelUsuario.map((a) => (
                                        <tr key={a.id}>
                                            <td>{getNombreOrg(a.idOrganizacion)}</td>
                                            <td>{a.FechaAplicacion}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Aún no tenés voluntariados registrados.</p>
                        )}
                    </div>

                    {/* Organizaciones */}
                    <div>
                        <h3>Organizaciones donde colaboré</h3>
                        {orgsDelUsuario.length > 0 ? (
                            <ul>
                                {orgsDelUsuario.map((org) => (
                                    <li key={org.id}>
                                        <strong>{org.NombreOrganizacion}</strong> — {org.Descripcion}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Aún no has colaborado con ninguna organización.</p>
                        )}
                    </div>

                </div>
            ) : (
                <p>Cargando información del perfil...</p>
            )}
        </div>
    )
}

export default PerfilVoluntario