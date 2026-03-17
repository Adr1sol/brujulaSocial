// GET PROVINCIAS - función que consulta todos las provincias
async function getProvincias() {
    try {
        const respuestaServidor = await fetch("http://localhost:3001/provincias")
        
        const datosProvincias = await respuestaServidor.json();

        return datosProvincias;

    } catch (error) {
        console.error("Error al obtener los provincias", error);
    }
}

export default {getProvincias}