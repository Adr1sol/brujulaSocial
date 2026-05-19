const { Usuario, Rol } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Login de usuario.
 * Busca por correo, valida contraseña y genera JWT con id y nombre del rol.
 */
const login = async (correo, contrasena) => {
    // 1. Verificar si el usuario existe, incluyendo su rol
    const usuario = await Usuario.findOne({
        where: { Correo: correo },
        include: [{ model: Rol, as: 'rol', attributes: ['id', 'nombre'] }]
    });

    if (!usuario) {
        throw new Error('Credenciales incorrectas');
    }

    // 2. Verificar la contraseña
    const passwordValida = await bcrypt.compare(contrasena, usuario.Contrasena);
    if (!passwordValida) {
        throw new Error('Credenciales incorrectas');
    }

    // 3. Generar el Token JWT con id y nombre del rol
    const token = jwt.sign(
        {
            id: usuario.id,
            idRol: usuario.idRol,
            rol: usuario.rol.nombre  // ej: "Admin", "Estudiante"
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    return { usuario, token };
};

/**
 * Registro de nuevo usuario.
 * Recibe idRol en vez de Tipo para asociar al usuario con la tabla roles.
 */
const registrar = async (datos) => {
    const { Nombre, Correo, Contrasena, idRol, IdProvincia } = datos;

    if (!Contrasena) {
        throw new Error('La propiedad "Contrasena" es requerida para el registro');
    }

    if (!idRol) {
        throw new Error('El campo "idRol" es requerido para el registro');
    }

    // Verificar que el rol exista (1=Admin, 2=Voluntario, 3=Organizacion)
    const rolExiste = await Rol.findByPk(idRol);
    if (!rolExiste) {
        throw new Error('El rol especificado no existe. Use: 1=Admin, 2=Voluntario, 3=Organizacion');
    }

    // Verificar duplicidad de correo
    const existe = await Usuario.findOne({ where: { Correo } });
    if (existe) throw new Error('El correo ya está registrado');

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedContrasena = await bcrypt.hash(Contrasena, salt);

    // Crear usuario
    const nuevoUsuario = await Usuario.create({
        Nombre,
        Correo,
        Contrasena: hashedContrasena,
        idRol,
        IdProvincia
    });

    // Retornar con el rol incluido (sin contraseña)
    return await Usuario.findByPk(nuevoUsuario.id, {
        attributes: { exclude: ['Contrasena'] },
        include: [{ model: Rol, as: 'rol', attributes: ['id', 'nombre'] }]
    });
};

module.exports = {
    login,
    registrar
};
