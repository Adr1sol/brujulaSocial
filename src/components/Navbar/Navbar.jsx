// components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from "react-router-dom"
import "../Navbar/NavBar.css"
import logo from '../../assets/logo.png';
 
function Navbar() {
    return (
      <>
        <header className="navbar">
          <div className="navbar-logo">
            <a href="/">
              <img src={logo} alt="Brújula Social Logo" className="logo-image" />
            </a>
            <a href="/">
              <span className="logo-text-gradient">BRÚJULA SOCIAL</span>
            </a>
          </div>
          <nav className="navbar-links">
            <a href="#about">Sobre Nosotros</a>
            <a href="/inicio">Inicia Sesión</a>
            <a href="#register" className="btn-register">Registro</a>
            <a href="#contact">Contacto</a>
          </nav>
        </header>
      </>
    );
}
export default Navbar;