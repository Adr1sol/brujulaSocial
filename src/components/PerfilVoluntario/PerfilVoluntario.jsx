import React, { useState, useEffect } from 'react'
import ServiceVoluntariado from '../../services/ServiceVoluntariado'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'

function PerfilVoluntario() {

    const [usuario, setUsuario] = useState(null)
    const [organizaciones, setOrganizaciones] = useState([])
    const [aplicacionesDelUsuario, setAplicacionesDelUsuario] = useState([])
    const [orgsDelUsuario, setOrgsDelUsuario] = useState([])

    useEffect(() => {
        async function cargarDatos() {

            // 1. Leer el usuario directo del localStorage
            const user = JSON.parse(localStorage.getItem("user"))
            setUsuario(user)

            // 2. Traer aplicaciones y filtrar las del usuario
            const todasLasAplicaciones = await ServiceVoluntariado.getVoluntariado()
            const aplicacionesFiltradas = todasLasAplicaciones.filter(
                (a) => String(a.idUsuario) === String(user.id)
            )
            setAplicacionesDelUsuario(aplicacionesFiltradas)

            // 3. Traer todas las organizaciones
            const todasLasOrgs = await ServiceOrganizaciones.getOrganizaciones()
            setOrganizaciones(todasLasOrgs)

            // 4. Filtrar solo las orgs donde el usuario aplicó
            const idsOrgs = [...new Set(aplicacionesFiltradas.map((a) => String(a.idOrganizacion)))]
            const orgsFiltradas = todasLasOrgs.filter(
                (org) => idsOrgs.includes(String(org.id))
            )
            setOrgsDelUsuario(orgsFiltradas)
        }

        cargarDatos()
    }, [])

    function getNombreOrg(idOrganizacion) {
        const org = organizaciones.find((o) => String(o.id) === String(idOrganizacion))
        return org ? org.NombreOrganizacion : "Organización desconocida"
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