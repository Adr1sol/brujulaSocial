import Carousel from 'react-bootstrap/Carousel';
import './Carrusel.css';

function Carrusel() {
    const images = [
        {
            src: "https://images.unsplash.com/photo-1618477434127-59728288544e?auto=format&fit=crop&q=80&w=1200",
            alt: "Limpieza de Playas",
            title: "Limpieza de Playas",
            description: "Protegiendo el ecosistema marino de Costa Rica."
        },
        {
            src: "https://images.unsplash.com/photo-1599059021752-19e3650143b1?auto=format&fit=crop&q=80&w=1200",
            alt: "Huertas Comunitarias",
            title: "Huertas Comunitarias",
            description: "Sembrando un futuro sostenible para todos."
        },
        {
            src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1200",
            alt: "Talleres Sociales",
            title: "Talleres de Impacto",
            description: "Capacitación y empoderamiento comunitario."
        }
    ];

    return (
        <Carousel fade interval={5000} pause="hover">
            {images.map((image, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={image.src}
                        alt={image.alt}
                    />
                    <Carousel.Caption className="custom-caption">
                        <h3>{image.title}</h3>
                        <p>{image.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Carrusel;