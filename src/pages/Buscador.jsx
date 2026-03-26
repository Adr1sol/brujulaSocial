import React, { useState } from 'react'
import FiltrosOrganizaciones  from '../components/Filtros/FiltrosOrganizaciones'
import BuscadorOrganizaciones from '../components/Buscador/BuscadorOrganizaciones'

function Buscador() {

    const [filtros, setFiltros] = useState({
        idCategoria: '',
        IdProvincia: '',
        idDisponibilidad: ''
    })

    function manejoCambioFiltro(campo, valor) {
        setFiltros((prev) => ({ ...prev, [campo]: valor }))
    }

    return (
        <BuscadorOrganizaciones
            filtros={filtros}
            onFiltroChange={manejoCambioFiltro}
        />
    )
}

export default Buscador