import React from 'react';
import Hero               from '../components/Hero/Hero';
import About              from '../components/AboutUs/AboutUs';
import ProyectosDestacados from '../components/ProyectosDestacados/ProyectosDestacados';
import Testimonials       from '../components/Testimonials/Testimonials';
import Footer             from '../components/Footer/Footer';

const HomePage = () => {
  return (
    <div>
      <Hero />

      {/* ✅ ID para scroll desde el navbar */}
      <div id="sobre-nosotros">
        <About />
      </div>

      <div id="organizaciones">
        <ProyectosDestacados />
      </div>

      <Testimonials />

      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;