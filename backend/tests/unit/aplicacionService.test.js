/**
 * Pruebas unitarias — aplicacionService
 * Cubre: obtenerTodas, obtenerPorUsuario, obtenerPorId, crear, eliminar
 */

jest.mock('../../src/models', () => ({
  Aplicacion: {
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn()
  },
  Usuario:      { findByPk: jest.fn() },
  Organizacion: { findByPk: jest.fn() }
}));

const { Aplicacion, Organizacion } = require('../../src/models');
const aplicacionService = require('../../src/services/aplicacionService');

const aplicacionMock = {
  id: 1,
  idUsuario: 1,
  idOrganizacion: 1,
  FechaAplicacion: new Date(),
  destroy: jest.fn().mockResolvedValue(true)
};

const orgMock = { id: 1, NombreOrganizacion: 'EcoVoluntarios CR' };

describe('aplicacionService — obtenerTodas', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Retorna lista paginada de aplicaciones', async () => {
    Aplicacion.findAndCountAll.mockResolvedValue({ count: 5, rows: [aplicacionMock] });

    const resultado = await aplicacionService.obtenerTodas(1, 10);

    expect(resultado.total).toBe(5);
    expect(resultado.paginas).toBe(1);
    expect(resultado.aplicaciones).toHaveLength(1);
  });
});

describe('aplicacionService — obtenerPorUsuario', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Retorna aplicaciones de un usuario', async () => {
    Aplicacion.findAndCountAll.mockResolvedValue({ count: 2, rows: [aplicacionMock] });

    const resultado = await aplicacionService.obtenerPorUsuario(1, 1, 10);

    expect(resultado.total).toBe(2);
    expect(resultado.aplicaciones).toHaveLength(1);
  });
});

describe('aplicacionService — obtenerPorId', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Retorna una aplicación por ID', async () => {
    Aplicacion.findByPk.mockResolvedValue(aplicacionMock);

    const resultado = await aplicacionService.obtenerPorId(1);
    expect(resultado.id).toBe(1);
  });

  test('✅ Retorna null si no existe', async () => {
    Aplicacion.findByPk.mockResolvedValue(null);

    const resultado = await aplicacionService.obtenerPorId(999);
    expect(resultado).toBeNull();
  });
});

describe('aplicacionService — crear', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Crea una aplicación correctamente', async () => {
    Aplicacion.findOne.mockResolvedValue(null);
    Organizacion.findByPk.mockResolvedValue(orgMock);
    Aplicacion.create.mockResolvedValue(aplicacionMock);

    const resultado = await aplicacionService.crear(1, 1);
    expect(Aplicacion.create).toHaveBeenCalled();
  });

  test('❌ Falla si ya existe una aplicación duplicada', async () => {
    Aplicacion.findOne.mockResolvedValue(aplicacionMock);

    await expect(aplicacionService.crear(1, 1))
      .rejects.toThrow('Ya aplicaste a esta organización');
  });

  test('❌ Falla si la organización no existe', async () => {
    Aplicacion.findOne.mockResolvedValue(null);
    Organizacion.findByPk.mockResolvedValue(null);

    await expect(aplicacionService.crear(1, 999))
      .rejects.toThrow('Organización no encontrada');
  });
});

describe('aplicacionService — eliminar', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Admin puede eliminar cualquier aplicación', async () => {
    Aplicacion.findByPk.mockResolvedValue(aplicacionMock);

    await aplicacionService.eliminar(1, 99, 'Admin');
    expect(aplicacionMock.destroy).toHaveBeenCalled();
  });

  test('✅ El dueño puede eliminar su propia aplicación', async () => {
    Aplicacion.findByPk.mockResolvedValue(aplicacionMock);

    await aplicacionService.eliminar(1, 1, 'Voluntario');
    expect(aplicacionMock.destroy).toHaveBeenCalled();
  });

  test('❌ Falla si no es el dueño ni Admin', async () => {
    Aplicacion.findByPk.mockResolvedValue(aplicacionMock);

    await expect(aplicacionService.eliminar(1, 99, 'Voluntario'))
      .rejects.toThrow('No tienes permiso');
  });

  test('❌ Falla si la aplicación no existe', async () => {
    Aplicacion.findByPk.mockResolvedValue(null);

    await expect(aplicacionService.eliminar(999, 1, 'Admin'))
      .rejects.toThrow('Aplicación no encontrada');
  });
});
