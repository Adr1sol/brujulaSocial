import Carousel from 'react-bootstrap/Carousel';

function Carrusel() {
    return (
        <Carousel>
            <Carousel.Item>
                <img src="../src/img/escuela.jpg" alt="" />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="../src/img/escuela.jpg" alt="" />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="../src/img/basura playa.jpg" alt="playa" />
                <img src="../src/img/escuela.jpg" alt="Escuela" />
                <img src="../src/img/Puente.jpg" alt="Puente" />
                <img src="../src/img/Refugio.jpg" alt="Refugio" />
                <img src="../src/img/voluntariado.jpg" alt="Voluntariado" />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cu
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Carrusel;