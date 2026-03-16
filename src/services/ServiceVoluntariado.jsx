// POST VOLUNTARIOS - función para guardar un nuevo voluntario
async function postVoluntariado(voluntariado) {
    try {
        const respuesta = await fetch("http://localhost:3001/voluntariado", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(voluntariado)
        })

        const datosVoluntariado = await respuesta.json();

        return datosVoluntariado;

    } catch (error) {
        console.error("Error al registrar el voluntariado", error);
    }
}


async function getVoluntariado() {
    try {
        const respuesta = await fetch("http://localhost:3001/voluntariado")
        const datos = await respuesta.json()
        return datos
    } catch (error) {
        console.error("Error al obtener los voluntarios", error)
    }
}

// PUT voluntariado - función para actualizar un voluntariado existente
async function putVoluntariado(voluntariado, id) {
    try {
        const respuesta = await fetch("http://localhost:3001/voluntariado/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(voluntariado)
        })

        const datosVoluntariado = await respuesta.json();

        return datosVoluntariado;

    } catch (error) {
        console.error("Error al actualizar el voluntariado", error);
    }
}


// DELETE voluntariado - función para eliminar un voluntariado
async function deleteVoluntariado(id) {
    try {
        const respuesta = await fetch("http://localhost:3001/voluntariado/" + id, {
            method: "DELETE"
        })

        const datosVoluntariado = await respuesta.json();

        return datosVoluntariado;

    } catch (error) {
        console.error("Error al eliminar el voluntariado", error);
    }
}


export default { postVoluntariado, getVoluntariado, putVoluntariado, deleteVoluntariado }