// GET CATEGORIAS - función que consulta todos las Categorias
async function getCategorias() {
    try {
        const respuestaServidor = await fetch("http://localhost:3001/categorias")
        
        const datosCategorias = await respuestaServidor.json();

        return datosCategorias;

    } catch (error) {
        console.error("Error al obtener los categorias", error);
    }
}

export default {getCategorias}


