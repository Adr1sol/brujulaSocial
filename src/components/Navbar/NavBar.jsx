// components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from "react-router-dom"
import "../Navbar/NavBar.css"
 
function Navbar() {
    return (
      <>
        <header className="navbar">
          <div className="navbar-logo">
            <div className="logo-icon">N</div>
            <a href="/">
            <span className="logo-text">BRÚJULA SOCIAL</span>
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