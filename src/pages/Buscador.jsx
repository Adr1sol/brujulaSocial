import React, { useState } from 'react'
import BuscadorOrganizaciones from '../components/Buscador/BuscadorOrganizaciones'
import FiltrosOrganizaciones from '../components/Filtros/FiltrosOrganizaciones'

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
        <div>
            <FiltrosOrganizaciones
                filtros={filtros}
                onFiltroChange={manejoCambioFiltro}
            />

            <BuscadorOrganizaciones
                filtros={filtros}
            />
        </div>
    )
}

export default Buscador