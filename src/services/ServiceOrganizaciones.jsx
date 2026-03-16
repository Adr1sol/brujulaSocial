// POST VOLUNTARIOS - función para guardar un nuevo voluntario
async function postOrganizaciones(organizaciones) {
    try {
        const respuesta = await fetch("http://localhost:3001/organizaciones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(organizaciones)
        })

        const datosOrganizaciones = await respuesta.json();

        return datosOrganizaciones;

    } catch (error) {
        console.error("Error al registrar la organización", error);
    }
}


async function getOrganización() {
    try {
        const respuesta = await fetch("http://localhost:3001/organizaciones")
        const datos = await respuesta.json()
        return datos
    } catch (error) {
        console.error("Error al obtener las organizaciones", error)
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