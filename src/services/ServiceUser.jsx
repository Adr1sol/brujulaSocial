// components/Services/Services.jsx
import React from 'react';
import './Services.css';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate()
  const projects = [
    {
      category: "EDUCACIÓN",
      location: "San José, Central",
      title: "Refuerzo Escolar en Comunidades",
      desc: "Apoya a niños y jóvenes en riesgo social con tutorías académicas y talleres recreativos los sábados.",
      color: "#078A87"
    },
    {
      category: "AMBIENTE",
      location: "Guanacaste, Tamarindo",
      title: "Limpieza de Playas y Manglares",
      desc: "Únete a la brigada ecológica para proteger nuestras costas y biodiversidad marina este fin de semana.",
      color: "#EF8514"
    },
    {
      category: "ADULTO MAYOR",
      location: "Alajuela, Central",
      title: "Acompañamiento Generacional",
      desc: "Brinda compañía y alegría a adultos mayores en hogares locales mediante charlas y actividades lúdicas.",
      color: "#50A15A"
    },
    {
      category: "RESCATE ANIMAL",
      location: "Cartago, Paraíso",
      title: "Cuidado en Refugios de Fauna",
      desc: "Ayuda en el mantenimiento, alimentación y socialización de animales rescatados esperando un hogar.",
      color: "#EF8514"
    }
  ];

  return (
    <section className="services-section">
      <div className="services-header">
        <h2>Proyectos Destacados</h2>
        <a href="#all" className="view-all">Ver todos los proyectos →</a>
      </div>
      
      <div className="projects-grid">
        {projects.map((proj, idx) => (
          <div className="project-card" key={idx}>
            <div className="project-image-placeholder">
              <span className="category-tag" style={{backgroundColor: proj.color}}>{proj.category}</span>
            </div>
            <div className="project-content">
              <span className="location">📍 {proj.location}</span>
              <h3>{proj.title}</h3>
              <p>{proj.desc}</p>
              <button className="btn-outline" 
                onClick={()=>{
                  navigate("/buscador")
                }}
              >Saber más</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;