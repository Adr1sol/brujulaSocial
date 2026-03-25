import React from 'react'
import Hero from '../components/Hero/Hero'
import NavbarGlobal from '../components/NavbarGlobal/NavbarGlobal'
import Footer from '../components/Footer/Footer'
import About from '../components/AboutUs/AboutUs'
import Services from '../services/ServiceUser'
import Testimonials from '../components/Testimonials/Testimonials'

const HomePage = () => {

  const usuario = JSON.parse(localStorage.getItem("user"))

  const linksHome = [
    { label: 'Inicio', path: '/' },
    { label: 'Explorar', path: '/buscador' },
    { label: 'Mi Perfil', path: '/perfil' },
    { label: 'Impacto Social', path: '/impacto' }
  ]

  return (
    <div>
      <NavbarGlobal links={linksHome} usuario={usuario} />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default HomePage

