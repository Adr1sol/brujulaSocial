import React, { useState, useEffect, useMemo } from 'react'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'
import ServiceCategorias from '../../services/ServiceCategorias'
import ServiceProvincias from '../../services/ServiceProvincias'
import ServiceDisponibilidades from '../../services/ServiceDisponibilidades'

function BuscadorOrganizaciones({ filtros }) {

    const [organizaciones, setOrganizaciones] = useState([])
    const [categorias, setCategorias] = useState([])
    const [provincias, setProvincias] = useState([])
    const [disponibilidades, setDisponibilidades] = useState([])

useEffect(() => {
    async function cargarDatos() {
        const todasLasOrgs = await ServiceOrganizaciones.getOrganizaciones()
        const todasLasCategorias = await ServiceCategorias.getCategorias()
        const todasLasProvincias = await ServiceProvincias.getProvincias()
        const todasLasDisponibilidades = await ServiceDisponibilidades.getDisponibilidades()

        console.log("Orgs:", todasLasOrgs)
        console.log("Categorias:", todasLasCategorias)
        console.log("Provincias:", todasLasProvincias)
        console.log("Disponibilidades:", todasLasDisponibilidades)

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
                ? org.idCategoria === parseInt(filtros.idCategoria)
                : true
            const matchProvincia = filtros.IdProvincia
                ? org.IdProvincia === parseInt(filtros.IdProvincia)
                : true
            const matchDisponibilidad = filtros.idDisponibilidad
                ? org.idDisponibilidad === parseInt(filtros.idDisponibilidad)
                : true

            return matchCategoria && matchProvincia && matchDisponibilidad
        })
    }, [organizaciones, filtros])

function getNombreCategoria(idCategoria) {
    const cat = categorias.find((c) => parseInt(c.id) === parseInt(idCategoria))
    return cat ? cat.NombreCategoria : 'Sin categoría'
}

function getNombreProvincia(IdProvincia) {
    const prov = provincias.find((p) => parseInt(p.id) === parseInt(IdProvincia))
    return prov ? prov.NombreProvincia : 'Sin provincia'
}

function getNombreDisponibilidad(idDisponibilidad) {
    const disp = disponibilidades.find((d) => parseInt(d.id) === parseInt(idDisponibilidad))
    return disp ? disp.NombreDisponibilidad : 'Sin disponibilidad'
}

    return (
        <div>
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
                        <button>Aplicar</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default BuscadorOrganizaciones