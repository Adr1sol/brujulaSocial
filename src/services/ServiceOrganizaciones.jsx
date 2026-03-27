
// POST Organizaciones
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


async function getOrganizaciones() {
    try {
        const respuesta = await fetch("http://localhost:3001/organizaciones")
        const datos = await respuesta.json()
        return datos
    } catch (error) {
        console.error("Error al obtener las organizaciones", error)
    }
}

// PUT organización - función para actualizar una organización existente
async function putOrganizaciones(organizaciones, id) {
    try {
        const respuesta = await fetch("http://localhost:3001/organizaciones/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(organizaciones)
        })

        const datosOrganizaciones = await respuesta.json();

        return datosOrganizaciones;

    } catch (error) {
        console.error("Error al actualizar las organizaciones", error);
    }
}


// DELETE organización - función para eliminar una organización
async function deleteOrganizaciones(id) {
    try {
        await fetch("http://localhost:3001/organizaciones/" + id, {
            method: "DELETE"
        })
    } catch (error) {
        console.error("Error al eliminar la organizaciones", error);
    }
}


export default {postOrganizaciones, getOrganizaciones, putOrganizaciones, deleteOrganizaciones}