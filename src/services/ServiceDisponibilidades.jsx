// GET DISPONIBILIDADES - función que consulta todos las Disponibilidades
async function getDisponibilidades() {
    try {
        const respuestaServidor = await fetch("http://localhost:3001/disponibilidades")
        
        const datosDisponibilidades = await respuestaServidor.json();

        return datosDisponibilidades;

    } catch (error) {
        console.error("Error al obtener los disponibilidades", error);
    }
}

export default {getDisponibilidades}