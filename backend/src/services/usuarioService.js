const { Usuario, Provincia, Organizacion, Categoria } = require('../models');


//Obtener todos los usuarios (voluntarios y orgs) excluyendo la contraseña

const obtenerTodosLosUsuarios = async () => {
    return await Usuario.findAll({
        attributes: { exclude: ['Contrasena'] },
        include: [
            {
                model: Provincia,
                as: 'provincia',
                attributes: ['id', 'NombreProvincia']
            }
        ]
    });
};


//Buscar un usuario específico con todo su perfil detallado

const buscarPorId = async (id) => {
    return await Usuario.findByPk(id, {
        attributes: { exclude: ['Contrasena'] },
        include: [
            {
                model: Provincia,
                as: 'provincia',
                attributes: ['id', 'NombreProvincia']
            },
            {
                model: Organizacion,
                as: 'organizacion',
                attributes: ['id', 'Nombre'],
                include: [
                    {
                        model: Categoria,
                        as: 'categoria',
                        attributes: ['id', 'NombreCategoria']
                    }
                ]
            }
        ]
    });
};



//modificación respuesta de Postman NO incluya la contraseña

const actualizarUsuario = async (id, datos) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuario no encontrado');

    // Ejecutamos la actualización en MySQL
    await usuario.update(datos);

    // Retornamos el usuario actualizado pero EXCLUYENDO la contraseña por seguridad
    return await Usuario.findByPk(id, {
        attributes: { exclude: ['Contrasena'] }
    });
};


// Eliminar un usuario de la base de datos

const eliminarUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuario no encontrado');
    return await usuario.destroy();
};

module.exports = {
    obtenerTodosLosUsuarios,
    buscarPorId,
    actualizarUsuario,
    eliminarUsuario
};