// POST horas
async function postHoras(horas) {
    try {
        const respuesta = await fetch("http://localhost:3001/horas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(horas)
        })
        const datosHoras = await respuesta.json()
        return datosHoras
    } catch (error) {
        console.error("Error al registrar las horas", error)
    }
}

// GET horas
async function getHoras() {
    try {
        const respuesta = await fetch("http://localhost:3001/horas")
        const datosHoras = await respuesta.json()
        return datosHoras
    } catch (error) {
        console.error("Error al obtener las horas", error)
    }
}

// PUT horas
async function putHoras(horas, id) {
    try {
        const respuesta = await fetch("http://localhost:3001/horas/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(horas)
        })
        const datosHoras = await respuesta.json()
        return datosHoras
    } catch (error) {
        console.error("Error al actualizar las horas", error)
    }
}

// DELETE horas
async function deleteHoras(id) {
    try {
        await fetch("http://localhost:3001/horas/" + id, {
            method: "DELETE"
        })
    } catch (error) {
        console.error("Error al eliminar las horas", error)
    }
}

export default { postHoras, getHoras, putHoras, deleteHoras }