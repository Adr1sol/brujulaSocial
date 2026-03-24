import React from 'react';
import Hero from '../components/Hero/Hero';
import Footer from '../components/Footer/Footer';
import About from '../components/AboutUs/AboutUs';
import Services from '../services/ServiceUser';
import Testimonials from '../components/Testimonials/Testimonials';
import background from '../images/fondo (1).png';
import NavbarGlobal from '../components/NavbarGlobal/NavbarGlobal';

const HomePage = () => {
  const pageStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
  };

  return (
    <div style={pageStyle}>
      <NavbarGlobal redirigir={()=>{
          window.location.href = "#footer"
      }}/>
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <div id='footer'>
      <Footer />
      </div>
    </div>
  );
};

export default HomePage
