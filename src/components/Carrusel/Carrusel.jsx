import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Carrusel.module.css';

// ✅ Todas las imágenes temáticas de src/images/
import basuraPlaya   from '../../images/basura playa.jpg';
import escuela       from '../../images/escuela.jpg';
import adultoMayor   from '../../images/adulto mayor.png';
import puente        from '../../images/Puente.jpg';
import refugio       from '../../images/Refugio.jpg';
import voluntariado  from '../../images/voluntariado.png';

function Carrusel() {
    const images = [
        {
            src: basuraPlaya,
            alt: "Limpieza de playa",
            title: "Transforma Nuestras Costas",
            description: "Recuperemos la belleza de nuestras playas a través del voluntariado consciente y la acción ambiental."
        },
        {
            src: escuela,
            alt: "Educación",
            title: "Forjemos un Futuro Brillante",
            description: "Brinda el conocimiento y apoyo que los niños en zonas vulnerables necesitan para alcanzar sus sueños."
        },
        {
            src: adultoMayor,
            alt: "Adulto mayor",
            title: "Honremos la Sabiduría",
            description: "Tu tiempo y compañía son el regalo más valioso para los adultos mayores de nuestra comunidad."
        },
        {
            src: puente,
            alt: "Comunidad",
            title: "Construyamos Puentes de Esperanza",
            description: "Unimos voluntades y talentos para reconstruir y fortalecer el tejido social costarricense."
        },
        {
            src: refugio,
            alt: "Refugio animal",
            title: "Protejamos a los que no tienen Voz",
            description: "Sé parte de nuestra red de rescate y protección para brindarles una segunda oportunidad de vida."
        },
        {
            src: voluntariado,
            alt: "Voluntariado",
            title: "Tu Huella es el Cambio",
            description: "Descubre el poder de tus acciones y transforma el mundo a través del voluntariado activo."
        }
    ];

    return (
        <Carousel interval={4000} fade controls={false} indicators={false}>
            {images.map((image, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={image.src}
                        alt={image.alt}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Carrusel;