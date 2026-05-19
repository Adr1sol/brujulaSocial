/**
 * Pruebas unitarias — usuarioService
 * Cubre: obtenerTodosLosUsuarios, buscarPorId, actualizarUsuario, eliminarUsuario
 */

jest.mock('../../src/models', () => ({
  Usuario: {
    findAll: jest.fn(),
    findByPk: jest.fn()
  },
  Provincia:    { findByPk: jest.fn() },
  Organizacion: { findByPk: jest.fn() },
  Categoria:    { findByPk: jest.fn() }
}));

const { Usuario } = require('../../src/models');
const usuarioService = require('../../src/services/usuarioService');

const usuarioMock = {
  id: 1,
  Nombre: 'Juan Pérez',
  Correo: 'juan@test.com',
  idRol: 2,
  update: jest.fn().mockResolvedValue(true),
  destroy: jest.fn().mockResolvedValue(true)
};

describe('usuarioService — obtenerTodosLosUsuarios', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Retorna lista de usuarios', async () => {
    Usuario.findAll.mockResolvedValue([usuarioMock]);

    const resultado = await usuarioService.obtenerTodosLosUsuarios();
    expect(resultado).toHaveLength(1);
    expect(resultado[0].Nombre).toBe('Juan Pérez');
  });
});

describe('usuarioService — buscarPorId', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Retorna un usuario por ID', async () => {
    Usuario.findByPk.mockResolvedValue(usuarioMock);

    const resultado = await usuarioService.buscarPorId(1);
    expect(resultado.Correo).toBe('juan@test.com');
  });

  test('✅ Retorna null si no existe', async () => {
    Usuario.findByPk.mockResolvedValue(null);

    const resultado = await usuarioService.buscarPorId(999);
    expect(resultado).toBeNull();
  });
});

describe('usuarioService — actualizarUsuario', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Actualiza un usuario existente', async () => {
    Usuario.findByPk
      .mockResolvedValueOnce(usuarioMock)
      .mockResolvedValueOnce(usuarioMock);

    const resultado = await usuarioService.actualizarUsuario(1, { Nombre: 'Juan Actualizado' });
    expect(usuarioMock.update).toHaveBeenCalled();
  });

  test('❌ Falla si el usuario no existe', async () => {
    Usuario.findByPk.mockResolvedValue(null);

    await expect(usuarioService.actualizarUsuario(999, {}))
      .rejects.toThrow('Usuario no encontrado');
  });
});

describe('usuarioService — eliminarUsuario', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Elimina un usuario existente', async () => {
    Usuario.findByPk.mockResolvedValue(usuarioMock);

    await usuarioService.eliminarUsuario(1);
    expect(usuarioMock.destroy).toHaveBeenCalled();
  });

  test('❌ Falla si el usuario no existe', async () => {
    Usuario.findByPk.mockResolvedValue(null);

    await expect(usuarioService.eliminarUsuario(999))
      .rejects.toThrow('Usuario no encontrado');
  });
});
