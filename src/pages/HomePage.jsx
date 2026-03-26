import React from 'react';
import Hero from '../components/Hero/Hero';
import About from '../components/AboutUs/AboutUs';
import ProyectosDestacados from '../components/ProyectosDestacados/ProyectosDestacados';
import Testimonials from '../components/Testimonials/Testimonials';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <ProyectosDestacados />
      <Testimonials />
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;