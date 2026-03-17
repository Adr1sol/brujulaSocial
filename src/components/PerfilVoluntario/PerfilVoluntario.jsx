import React, { useState, useEffect } from 'react'
import ServiceVoluntariado from '../../services/ServiceVoluntariado'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'

function PerfilVoluntario() {

    const [voluntario, setVoluntario] = useState(null)
    const [organizaciones, setOrganizaciones] = useState([])
    const [horasDelVoluntario, setHorasDelVoluntario] = useState([])
    const [orgsDelVoluntario, setOrgsDelVoluntario] = useState([])

    const nombre = localStorage.getItem("nombre")

    useEffect(() => {
        async function cargarDatos() {

            // 1. Traer todos los voluntarios y encontrar el actual
            const todosLosVoluntarios = await ServiceVoluntario.getVoluntarios()
            const voluntarioEncontrado = todosLosVoluntarios.find(
                (v) => v.nombre === nombre
            )
            setVoluntario(voluntarioEncontrado)

            // 2. Traer todas las horas y filtrar las del voluntario
            const todasLasHoras = await ServiceHoras.getHoras()
            const horasFiltradas = todasLasHoras.filter(
                (h) => h.voluntarioId === voluntarioEncontrado.id
            )
            setHorasDelVoluntario(horasFiltradas)

            // 3. Traer todas las organizaciones
            const todasLasOrgs = await ServiceOrganizaciones.getOrganizaciones()
            setOrganizaciones(todasLasOrgs)

            // 4. Obtener solo las organizaciones donde el voluntario participó
            const idsOrgs = [...new Set(horasFiltradas.map((h) => h.organizacionId))]
            const orgsFiltradas = todasLasOrgs.filter(
                (org) => idsOrgs.includes(org.id)
            )
            setOrgsDelVoluntario(orgsFiltradas)
        }

        cargarDatos()
    }, [])

    // Función helper para encontrar el nombre de una organización por su id
    function getNombreOrg(organizacionId) {
        const org = organizaciones.find((o) => o.id === organizacionId)
        return org ? org.nombre : "Organización desconocida"
    }

    // Función para calcular el total de horas
    function calcularTotalHoras() {
        return horasDelVoluntario.reduce((total, h) => total + h.horas, 0)
    }

    return (
        <div>
            <h2>Mi Perfil</h2>

            {voluntario ? (
                <div>

                    {/* ── Información personal ── */}
                    <div>
                        <h3>Información personal</h3>
                        <p><strong>Nombre completo:</strong> {voluntario.nombre}</p>
                        <p><strong>Correo:</strong> {voluntario.correo}</p>
                        <p><strong>Provincia:</strong> {voluntario.provincia}</p>
                        <p><strong>Total de horas donadas:</strong> {calcularTotalHoras()} h</p>
                    </div>

                    {/* ── Historial de horas ── */}
                    <div>
                        <h3>Historial de horas de voluntariado</h3>

                        {horasDelVoluntario.length > 0 ? (
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
                                    {horasDelVoluntario.map((registro) => (
                                        <tr key={registro.id}>
                                            <td>{registro.actividad}</td>
                                            <td>{getNombreOrg(registro.organizacionId)}</td>
                                            <td>{registro.fecha}</td>
                                            <td>{registro.horas} h</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Aún no tenés horas registradas.</p>
                        )}
                    </div>

                    {/* ── Organizaciones ── */}
                    <div>
                        <h3>Organizaciones donde colaboré</h3>

                        {orgsDelVoluntario.length > 0 ? (
                            <ul>
                                {orgsDelVoluntario.map((org) => (
                                    <li key={org.id}>
                                        <strong>{org.nombre}</strong> — {org.categoria}
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