// GET USUARIOS - función que consulta todos los usuarios
async function getUsuarios() {
    try {
        const respuestaServidor = await fetch("http://localhost:3001/usuarios")
        
        const datosUsuarios = await respuestaServidor.json();

        return datosUsuarios;

    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
}


// POST USUARIOS - función para guardar un nuevo usuario
async function postUsuario(usuario) {
    try {
        const respuesta = await fetch("http://localhost:3001/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })

        const datosUsuario = await respuesta.json();

        return datosUsuario;

    } catch (error) {
        console.error("Error al registrar el usuario", error);
    }
}


// PUT USUARIOS - función para actualizar un usuario existente
async function putUsuario(usuario, id) {
    try {
        const respuesta = await fetch("http://localhost:3001/usuarios/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })

        const datosUsuario = await respuesta.json();

        return datosUsuario;

    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}


// DELETE USUARIOS - función para eliminar un usuario

async function deleteUsuario(id) {
    try {
        await fetch("http://localhost:3001/usuarios/" + id, {
            method: "DELETE"
        })
    } catch (error) {
        console.error("Error al eliminar el usuario", error)
    }
}
export default { getUsuarios, postUsuario, putUsuario, deleteUsuario }