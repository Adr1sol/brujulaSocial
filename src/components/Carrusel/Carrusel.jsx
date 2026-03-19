import Carousel from 'react-bootstrap/Carousel';
import './Carrusel.css';

function Carrusel() {
    const images = [
        {
            src: "../src/images/basura playa.jpg",
            alt: "First slide",
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "/fondoinicio.png",
            alt: "Second slide",
            title: "Second slide label",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            src: "/fondoparaweb.png",
            alt: "Third slide",
            title: "Third slide label",
            description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur."
        }
    ];
    return (
        <Carousel>
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