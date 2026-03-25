import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carrusel.module.css';

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
            title: "Cuida el planeta",
            description: "Únete a nuestros voluntarios en la limpieza y conservación de espacios naturales."
        },
        {
            src: escuela,
            alt: "Educación",
            title: "Educación para todos",
            description: "Apoya a niños y jóvenes en zonas vulnerables de Costa Rica."
        },
        {
            src: adultoMayor,
            alt: "Adulto mayor",
            title: "Cuida a quienes más lo necesitan",
            description: "Brinda compañía y apoyo a adultos mayores en tu comunidad."
        },
        {
            src: puente,
            alt: "Comunidad",
            title: "Construyamos juntos",
            description: "Conectamos el talento y el corazón de los costarricenses con las causas que lo necesitan."
        },
        {
            src: refugio,
            alt: "Refugio animal",
            title: "Bienestar animal",
            description: "Ayuda a rescatar y proteger animales en situación de vulnerabilidad."
        },
        {
            src: voluntariado,
            alt: "Voluntariado",
            title: "Impacta tu mundo",
            description: "Juntos construimos una Costa Rica más solidaria y comprometida."
        }
    ];

    return (
        <Carousel interval={4000} fade>
            {images.map((image, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={image.src}
                        alt={image.alt}
                    />
                    <Carousel.Caption>
                        <h3>{image.title}</h3>
                        <p>{image.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Carrusel;