import React, { useState, useEffect } from 'react'
import ServiceCategorias from '../../services/ServiceCategorias'
import ServiceProvincias from '../../services/ServiceProvincias'
import ServiceDisponibilidades from '../../services/ServiceDisponibilidades'

function FiltrosOrganizaciones({ filtros, onFiltroChange }) {

    const [categorias, setCategorias] = useState([])
    const [provincias, setProvincias] = useState([])
    const [disponibilidades, setDisponibilidades] = useState([])

    useEffect(() => {
        async function cargarOpciones() {
            const todasLasCategorias = await ServiceCategorias.getCategorias()
            const todasLasProvincias = await ServiceProvincias.getProvincias()
            const todasLasDisponibilidades = await ServiceDisponibilidades.getDisponibilidades()

            setCategorias(todasLasCategorias)
            setProvincias(todasLasProvincias)
            setDisponibilidades(todasLasDisponibilidades)
        }

        cargarOpciones()
    }, [])

    return (
        <div>
            <label htmlFor="categoria">Categoría</label>
            <select
                id="categoria"
                value={filtros.idCategoria}
                onChange={(e) => onFiltroChange('idCategoria', e.target.value)}
            >
                <option value="">Todas las categorías</option>
                {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.NombreCategoria}
                    </option>
                ))}
            </select>

            <label htmlFor="provincia">Provincia</label>
            <select
                id="provincia"
                value={filtros.IdProvincia}
                onChange={(e) => onFiltroChange('IdProvincia', e.target.value)}
            >
                <option value="">Todas las provincias</option>
                {provincias.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                        {prov.NombreProvincia}
                    </option>
                ))}
            </select>

            <label htmlFor="disponibilidad">Disponibilidad</label>
            <select
                id="disponibilidad"
                value={filtros.idDisponibilidad}
                onChange={(e) => onFiltroChange('idDisponibilidad', e.target.value)}
            >
                <option value="">Toda la disponibilidad</option>
                {disponibilidades.map((disp) => (
                    <option key={disp.id} value={disp.id}>
                        {disp.NombreDisponibilidad}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default FiltrosOrganizaciones