/**
 * Pruebas unitarias — organizacionService
 * Cubre: obtenerTodas, obtenerPorId, crear, actualizar, eliminar
 */

jest.mock('../../src/models', () => ({
  Organizacion: {
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn()
  },
  Categoria:      { findByPk: jest.fn() },
  Provincia:      { findByPk: jest.fn() },
  Disponibilidad: { findByPk: jest.fn() }
}));

const { Organizacion } = require('../../src/models');
const organizacionService = require('../../src/services/organizacionService');

const orgMock = {
  id: 1,
  NombreOrganizacion: 'EcoVoluntarios CR',
  Descripcion: 'Organización ambiental',
  idCategoria: 1,
  IdProvincia: 2,
  idDisponibilidad: 3,
  update: jest.fn().mockResolvedValue(true),
  destroy: jest.fn().mockResolvedValue(true)
};

describe('organizacionService — obtenerTodas', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Retorna lista paginada de organizaciones', async () => {
    Organizacion.findAndCountAll.mockResolvedValue({
      count: 20,
      rows: [orgMock]
    });

    const resultado = await organizacionService.obtenerTodas(1, 10);

    expect(resultado.total).toBe(20);
    expect(resultado.paginas).toBe(2);
    expect(resultado.paginaActual).toBe(1);
    expect(resultado.organizaciones).toHaveLength(1);
  });

  test('✅ Aplica filtro de búsqueda por nombre', async () => {
    Organizacion.findAndCountAll.mockResolvedValue({ count: 1, rows: [orgMock] });

    await organizacionService.obtenerTodas(1, 10, { search: 'eco' });

    expect(Organizacion.findAndCountAll).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          NombreOrganizacion: expect.any(Object)
        })
      })
    );
  });
});

describe('organizacionService — obtenerPorId', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Retorna una organización por ID', async () => {
    Organizacion.findByPk.mockResolvedValue(orgMock);

    const resultado = await organizacionService.obtenerPorId(1);
    expect(resultado.NombreOrganizacion).toBe('EcoVoluntarios CR');
  });

  test('✅ Retorna null si no existe', async () => {
    Organizacion.findByPk.mockResolvedValue(null);

    const resultado = await organizacionService.obtenerPorId(999);
    expect(resultado).toBeNull();
  });
});

describe('organizacionService — crear', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Crea una organización correctamente', async () => {
    Organizacion.create.mockResolvedValue(orgMock);

    const resultado = await organizacionService.crear({
      Nombre: 'EcoVoluntarios CR',
      Descripcion: 'Organización ambiental',
      idCategoria: 1
    });

    expect(Organizacion.create).toHaveBeenCalled();
  });

  test('❌ Falla si no se proporciona el nombre', async () => {
    await expect(organizacionService.crear({ Descripcion: 'Sin nombre' }))
      .rejects.toThrow('El nombre de la organización es requerido');
  });
});

describe('organizacionService — actualizar', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Actualiza una organización existente', async () => {
    Organizacion.findByPk
      .mockResolvedValueOnce(orgMock)   // primera llamada: buscar
      .mockResolvedValueOnce(orgMock);  // segunda llamada: retornar actualizado

    const resultado = await organizacionService.actualizar(1, { Descripcion: 'Nueva descripción' });
    expect(orgMock.update).toHaveBeenCalled();
  });

  test('❌ Falla si la organización no existe', async () => {
    Organizacion.findByPk.mockResolvedValue(null);

    await expect(organizacionService.actualizar(999, {}))
      .rejects.toThrow('Organización no encontrada');
  });
});

describe('organizacionService — eliminar', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Elimina una organización existente', async () => {
    Organizacion.findByPk.mockResolvedValue(orgMock);

    await organizacionService.eliminar(1);
    expect(orgMock.destroy).toHaveBeenCalled();
  });

  test('❌ Falla si la organización no existe', async () => {
    Organizacion.findByPk.mockResolvedValue(null);

    await expect(organizacionService.eliminar(999))
      .rejects.toThrow('Organización no encontrada');
  });
});
