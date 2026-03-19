async function getVoluntariado() {
    try {
        const respuesta = await fetch("http://localhost:3001/aplicaciones")
        const datos = await respuesta.json()
        return datos
    } catch (error) {
        console.error("Error al obtener las aplicaciones", error)
    }
}

async function postVoluntariado(voluntariado) {
    try {
        const respuesta = await fetch("http://localhost:3001/aplicaciones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(voluntariado)
        })
        const datos = await respuesta.json()
        return datos
    } catch (error) {
        console.error("Error al registrar la aplicación", error)
    }
}

export default { getVoluntariado, postVoluntariado }