import Carousel from 'react-bootstrap/Carousel';
import escuela from '../../img/escuela.jpg';
import basuraPlaya from '../../img/basura playa.jpg';
import puente from '../../img/Puente.jpg';
import refugio from '../../img/Refugio.jpg';
import voluntariado from '../../img/voluntariado.png';

function Carrusel() {
    return (
        <Carousel>
            <Carousel.Item>
                <img className="d-block w-100" src={escuela} alt="Escuela" style={{ height: '100vh', objectFit: 'cover' }} />
                <Carousel.Caption>
                    <h3>Educación que transforma</h3>
                    <p>Apoya el futuro de nuestros niños en comunidades locales.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={basuraPlaya} alt="Playa" style={{ height: '100vh', objectFit: 'cover' }} />
                <Carousel.Caption>
                    <h3>Costas limpias, vida sana</h3>
                    <p>Únete a las jornadas de limpieza y conservación en nuestras playas.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={voluntariado} alt="Voluntariado" style={{ height: '100vh', objectFit: 'cover' }} />
                <Carousel.Caption>
                    <h3>Impacto Real</h3>
                    <p>Cientos de voluntarios ya están haciendo la diferencia en Costa Rica.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Carrusel;