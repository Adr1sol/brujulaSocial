import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carrusel.css';

// ✅ Todas las imágenes temáticas de src/images/
import imgMedioAmbiente from '../../images/basura playa.jpg';
import imgEducacion from '../../images/escuela.jpg';
import imgTerceraEdad from '../../images/adulto mayor.png';
import imgVoluntariado from '../../images/voluntariado.png';

function Carrusel() {
    return (
        <div className="carousel-container my-5">
            <Carousel fade className="custom-carousel shadow-lg rounded-4 overflow-hidden">
                <Carousel.Item interval={3500}>
                    <div className="image-overlay"></div>
                    <img
                        className="d-block w-100 carousel-img"
                        src={imgMedioAmbiente}
                        alt="Limpieza de playas"
                    />
                </Carousel.Item>

                <Carousel.Item interval={3500}>
                    <div className="image-overlay"></div>
                    <img
                        className="d-block w-100 carousel-img"
                        src={imgEducacion}
                        alt="Apoyo escolar"
                    />
                </Carousel.Item>

                <Carousel.Item interval={3500}>
                    <div className="image-overlay"></div>
                    <img
                        className="d-block w-100 carousel-img"
                        src={imgTerceraEdad}
                        alt="Acompañamiento a adultos mayores"
                    />
                </Carousel.Item>

                <Carousel.Item interval={3500}>
                    <div className="image-overlay"></div>
                    <img
                        className="d-block w-100 carousel-img"
                        src={imgVoluntariado}
                        alt="Voluntariado General"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Carrusel;