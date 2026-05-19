const { Usuario, Organizacion, Rol, sequelize } = require('../models');
const bcrypt = require('bcryptjs');

/**
 * Registro de organización con transacción.
 * Crea el usuario (rol=Organizacion) y la organización en una sola operación atómica.
 * Si cualquiera falla, se revierten ambos.
 * 
 * @param {object} datos - { Nombre, Correo, Contrasena, Descripcion, idCategoria, IdProvincia, idDisponibilidad, Contacto }
 * @returns {object} { usuario, organizacion }
 */
const registrarOrganizacion = async (datos) => {
    const {
        Nombre, Correo, Contrasena,
        Descripcion, idCategoria, IdProvincia,
        idDisponibilidad, Contacto
    } = datos;

    // Validaciones previas a la transacción
    if (!Nombre || !Correo || !Contrasena) {
        throw new Error('Nombre, Correo y Contrasena son requeridos');
    }

    // Verificar que el correo no esté registrado
    const existe = await Usuario.findOne({ where: { Correo } });
    if (existe) throw new Error('El correo ya está registrado');

    // Verificar que el rol Organizacion existe (id=3)
    const rolOrg = await Rol.findOne({ where: { nombre: 'Organizacion' } });
    if (!rolOrg) throw new Error('El rol Organizacion no existe en la base de datos');

    // Encriptar contraseña antes de la transacción
    const salt = await bcrypt.genSalt(10);
    const hashedContrasena = await bcrypt.hash(Contrasena, salt);

    // Iniciar transacción
    const t = await sequelize.transaction();

    try {
        // OPERACIÓN 1: Crear usuario con rol Organizacion
        const nuevoUsuario = await Usuario.create({
            Nombre,
            Correo,
            Contrasena: hashedContrasena,
            idRol: rolOrg.id
        }, { transaction: t });

        // OPERACIÓN 2: Crear la organización
        const nuevaOrganizacion = await Organizacion.create({
            NombreOrganizacion: Nombre,
            Descripcion:        Descripcion || '',
            Contacto:           Contacto || Correo,
            idCategoria:        idCategoria || null,
            IdProvincia:        IdProvincia || null,
            idDisponibilidad:   idDisponibilidad || null
        }, { transaction: t });

        // Si ambas operaciones funcionaron → confirmar
        await t.commit();

        return {
            usuario: {
                id:     nuevoUsuario.id,
                Nombre: nuevoUsuario.Nombre,
                Correo: nuevoUsuario.Correo,
                idRol:  nuevoUsuario.idRol
            },
            organizacion: nuevaOrganizacion
        };

    } catch (error) {
        // Si algo falló → revertir todo
        await t.rollback();
        throw new Error(`Error en el registro: ${error.message}`);
    }
};

module.exports = { registrarOrganizacion };
