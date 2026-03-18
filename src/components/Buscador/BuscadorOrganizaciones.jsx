import React, { useState, useEffect, useMemo } from 'react'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'
import ServiceCategorias from '../../services/ServiceCategorias'
import ServiceProvincias from '../../services/ServiceProvincias'
import ServiceDisponibilidades from '../../services/ServiceDisponibilidades'
import ServiceVoluntariado from '../../services/ServiceVoluntariado'
import { useNavigate } from 'react-router-dom'

function BuscadorOrganizaciones({ filtros }) {

    const [organizaciones, setOrganizaciones] = useState([])
    const [categorias, setCategorias] = useState([])
    const [provincias, setProvincias] = useState([])
    const [disponibilidades, setDisponibilidades] = useState([])
    const [mensaje, setMensaje] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        async function cargarDatos() {
            const todasLasOrgs = await ServiceOrganizaciones.getOrganizaciones()
            const todasLasCategorias = await ServiceCategorias.getCategorias()
            const todasLasProvincias = await ServiceProvincias.getProvincias()
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
            const matchCategoria = filtros.idCategoria
                ? org.idCategoria === filtros.idCategoria
                : true
            const matchProvincia = filtros.IdProvincia
                ? org.IdProvincia === filtros.IdProvincia
                : true
            const matchDisponibilidad = filtros.idDisponibilidad
                ? org.idDisponibilidad === filtros.idDisponibilidad
                : true

            return matchCategoria && matchProvincia && matchDisponibilidad
        })
    }, [organizaciones, filtros])

    function getNombreCategoria(idCategoria) {
        const cat = categorias.find((c) => c.id === idCategoria)
        return cat ? cat.NombreCategoria : 'Sin categoría'
    }

    function getNombreProvincia(IdProvincia) {
        const prov = provincias.find((p) => p.id === IdProvincia)
        return prov ? prov.NombreProvincia : 'Sin provincia'
    }

    function getNombreDisponibilidad(idDisponibilidad) {
        const disp = disponibilidades.find((d) => d.id === idDisponibilidad)
        return disp ? disp.NombreDisponibilidad : 'Sin disponibilidad'
    }

    async function handleAplicar(org) {

        // 1. Verificar si hay un usuario logueado
        const user = JSON.parse(localStorage.getItem("user"))

        // 2. Si no está logueado → redirigir al registro
        if (!user) {
            navigate("/registro")
            return
        }

        // 3. Verificar si ya aplicó a esta organización
        const todasLasAplicaciones = await ServiceVoluntariado.getVoluntariado()
        const yaAplico = todasLasAplicaciones.find(
            (a) => a.idUsuario === user.id && a.idOrganizacion === org.id
        )

        if (yaAplico) {
            setMensaje(`Ya aplicaste a ${org.NombreOrganizacion}`)
            setTimeout(() => setMensaje(""), 3000)
            return
        }

        // 4. Crear la aplicación y guardarla en db.json
        const nuevaAplicacion = {
            idUsuario: user.id,
            idOrganizacion: org.id,
            FechaAplicacion: new Date().toISOString().split('T')[0]
        }

        const resultado = await ServiceVoluntariado.postVoluntariado(nuevaAplicacion)

        if (resultado) {
            setMensaje(`¡Aplicaste exitosamente a ${org.NombreOrganizacion}!`)
            setTimeout(() => setMensaje(""), 3000)
        } else {
            setMensaje("Error al aplicar. Intentá de nuevo.")
            setTimeout(() => setMensaje(""), 3000)
        }
    }

    return (
        <div>
            {mensaje && (
                <p>{mensaje}</p>
            )}

            {organizacionesFiltradas.length === 0 ? (
                <p>No se encontraron organizaciones con los filtros seleccionados.</p>
            ) : (
                organizacionesFiltradas.map((org) => (
                    <div key={org.id}>
                        <h3>{org.NombreOrganizacion}</h3>
                        <p>{org.Descripcion}</p>
                        <p><strong>Categoría:</strong> {getNombreCategoria(org.idCategoria)}</p>
                        <p><strong>Provincia:</strong> {getNombreProvincia(org.IdProvincia)}</p>
                        <p><strong>Disponibilidad:</strong> {getNombreDisponibilidad(org.idDisponibilidad)}</p>
                        <button onClick={() => handleAplicar(org)}>Aplicar</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default BuscadorOrganizaciones