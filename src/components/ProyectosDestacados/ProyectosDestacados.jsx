import { useNavigate } from 'react-router-dom';
import styles from './ProyectosDestacados.module.css';

// ✅ Imágenes importadas correctamente con Vite
import escuela from '../../images/escuela.jpg';
import basura  from '../../images/basura playa.jpg';
import adulto  from '../../images/adulto mayor.png';
import refugio from '../../images/Refugio.jpg';

const ProyectosDestacados = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('user') || 'null');
  const rutaBuscador = usuario ? '/buscador' : '/explorar';

  const projects = [
    {
      category: "EDUCACIÓN",
      categoryColor: "#078A87",
      location: "San José, Central",
      title: "Refuerzo Escolar en Comunidades",
      desc: "Tutorías académicas y talleres recreativos los sábados.",
      img: escuela
    },
    {
      category: "AMBIENTE",
      categoryColor: "#EF8514",
      location: "Guanacaste, Tamarindo",
      title: "Limpieza de Playas y Manglares",
      desc: "Protección de nuestras costas y biodiversidad marina.",
      img: basura
    },
    {
      category: "ADULTO MAYOR",
      categoryColor: "#078A87",
      location: "Alajuela, Central",
      title: "Acompañamiento Generacional",
      desc: "Charlas y actividades lúdicas en hogares locales.",
      img: adulto
    },
    {
      category: "RESCATE ANIMAL",
      categoryColor: "#EF8514",
      location: "Cartago, Paraíso",
      title: "Cuidado en Refugios de Fauna",
      desc: "Alimentación y socialización de animales rescatados.",
      img: refugio
    }
  ];

  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          Proyectos <span className={styles.titleAccent}>Destacados</span>
        </h2>
        <a href={rutaBuscador} className={styles.viewAll}>
          VER TODOS LOS PROYECTOS →
        </a>
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
              <span className={styles.location}>📍 {proj.location}</span>
              <h3 className={styles.cardTitle}>{proj.title}</h3>
              <p className={styles.desc}>{proj.desc}</p>
              <button
                className={styles.btn}
                onClick={() => { window.scrollTo(0, 0); navigate(rutaBuscador) }}
              >
                Saber más
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProyectosDestacados;