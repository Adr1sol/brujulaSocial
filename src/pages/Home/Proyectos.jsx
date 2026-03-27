import React from 'react'
import NavbarGlobal from '../../components/NavbarGlobal/NavbarGlobal'
import Footer from '../../components/Footer/Footer'
import ListadoProyectos from '../../components/ListaProyectos/ListadoProyectos'

function Proyectos() {
  return (
    <div>
        <NavbarGlobal />
        <ListadoProyectos />
        <Footer />
    </div>
  )
}

export default Proyectos