import React from 'react';
import styles from './ListadoProyectos.module.css';
import { useNavigate } from 'react-router-dom';
import NavbarGlobal from '../NavbarGlobal/NavbarGlobal';
import Footer from '../Footer/Footer';

// Impotación de imágenes
import escuela from '../../images/escuela.jpg';
import basura from '../../images/basura playa.jpg';
import adulto from '../../images/adulto mayor.png';
import refugio from '../../images/Refugio.jpg';

const ListadoProyectos = () => {
  const navigate = useNavigate();

  const projects = [
    {
      organization: "Fundación Educar Futuro",
      category: "EDUCACIÓN",
      categoryColor: "#078A87",
      location: "San José, Central",
      title: "Refuerzo Escolar en Comunidades",
      desc: "Tutorías académicas y talleres recreativos los sábados.",
      img: escuela
    },
    {
      organization: "Océanos Limpios CR",
      category: "AMBIENTE",
      categoryColor: "#EF8514",
      location: "Guanacaste, Tamarindo",
      title: "Limpieza de Playas y Manglares",
      desc: "Protección de nuestras costas y biodiversidad marina.",
      img: basura
    },
    {
      organization: "Asociación Años Dorados",
      category: "ADULTO MAYOR",
      categoryColor: "#078A87",
      location: "Alajuela, Central",
      title: "Acompañamiento Generacional",
      desc: "Charlas y actividades lúdicas en hogares locales.",
      img: adulto
    },
    {
      organization: "Refugio Animal Vida",
      category: "RESCATE ANIMAL",
      categoryColor: "#EF8514",
      location: "Cartago, Paraíso",
      title: "Cuidado en Refugios de Fauna",
      desc: "Alimentación y socialización de animales rescatados.",
      img: refugio
    },
    {
      organization: "EcoSiembra CR",
      category: "MEDIO AMBIENTE",
      categoryColor: "#1D9E75",
      location: "Heredia, Sarapiquí",
      title: "Reforestación de Zonas Verdes",
      desc: "Plantación de árboles nativos para recuperar el ecosistema.",
      img: escuela // Reutilizando imagen para mantener estética
    },
    {
      organization: "Comunidad Segura",
      category: "DESARROLLO",
      categoryColor: "#078A87",
      location: "Limón, Centro",
      title: "Mejora de Espacios Públicos",
      desc: "Restauración de parques y zonas recreativas.",
      img: basura 
    },
    {
      organization: "Sonrisas Mayores",
      category: "ADULTO MAYOR",
      categoryColor: "#1D9E75",
      location: "San José, Desamparados",
      title: "Apoyo Emocional a Mayores",
      desc: "Programa de visitas semanales y apoyo psicológico.",
      img: adulto
    },
    {
      organization: "Huellas de Amor",
      category: "RESCATE ANIMAL",
      categoryColor: "#EF8514",
      location: "Puntarenas, Jacó",
      title: "Castración y Rescate Callejero",
      desc: "Jornadas de castración y adopción de perros y gatos.",
      img: refugio
    }
  ];

  return (
    <>
      <NavbarGlobal />
      <main className={styles.mainContainer}>
        <section className={styles.section}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>
              Proyectos <span className={styles.titleAccent}>Realizados</span>
            </h1>
            <p className={styles.subtitle}>
              Explora las iniciativas de las organizaciones que ya están marcando una diferencia real en nuestra comunidad.
            </p>
          </div>

          {/* Grid de cards */}
          <div className={styles.grid}>
            {projects.map((proj, idx) => (
              <div className={styles.card} key={idx}>
                {/* Imagen */}
                <div className={styles.imageWrap}>
                  <img src={proj.img} alt={proj.title} className={styles.image} />
                  <span
                    className={styles.categoryTag}
                    style={{ backgroundColor: proj.categoryColor }}
                  >
                    {proj.category}
                  </span>
                </div>

                {/* Contenido */}
                <div className={styles.content}>
                  <span className={styles.organization}>🏢 {proj.organization}</span>
                  <span className={styles.location}>📍 {proj.location}</span>
                  <h3 className={styles.cardTitle}>{proj.title}</h3>
                  <p className={styles.desc}>{proj.desc}</p>
                  <button
                    className={styles.btn}
                    onClick={() => navigate('/buscador')}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ListadoProyectos;
