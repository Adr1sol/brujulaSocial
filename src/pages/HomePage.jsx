import React from 'react'
import Hero from '../components/Hero/Hero'
import Navbar from '../components/Navbar/NavBar'
import Footer from '../components/Footer/Footer'
import About from '../components/AboutUs/AboutUs'
import Services from '../services/ServiceUser'
import Testimonials from '../components/Testimonials/Testimonials'

const HomePage = () => {
  return (
    <div>
      <Navbar/>
        <Hero/>
        <About/>
        <Services/>
        <Testimonials/>
        <Footer/>
    </div>
  )
}

export default HomePage
