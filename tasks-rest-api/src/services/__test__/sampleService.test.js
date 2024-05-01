/* eslint-disable global-require */

jest.mock('../../utils/contextUtils');
jest.mock('../../database/withTransaction');

describe('getRoles', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return all user roles', async () => {
    jest.mock('../../repositories/sampleRepository', () => ({
      __esModule: true,
      getRoles: () => [
        { roleId: 1, roleName: 'Normal User' },
        { roleId: 2, roleName: 'Manager' },
        { roleId: 3, roleName: 'Viewer' },
        { roleId: 4, roleName: 'Administrator' }
      ],
      getUsersByRoles: () => [
        { roleId: 1, userIds: [1, 2] },
        { roleId: 2, userIds: [3, 4] },
        { roleId: 3, userIds: [5, 6] },
        { roleId: 4, userIds: [8, 7] }
      ]
    }));

    const sampleService = require('../sampleService');
    const response = await sampleService.getRoles();

    const expectedResponse = [
      { roleId: 1, roleName: 'Normal User', users: { roleId: 1, userIds: [1, 2] } },
      { roleId: 2, roleName: 'Manager', users: { roleId: 2, userIds: [3, 4] } },
      { roleId: 3, roleName: 'Viewer', users: { roleId: 3, userIds: [5, 6] } },
      { roleId: 4, roleName: 'Administrator', users: { roleId: 4, userIds: [8, 7] } }
    ];
    expect(response).toEqual(expectedResponse);
  });

  it('should throw an error, if there is an error in repository', async () => {
    jest.doMock('../../repositories/sampleRepository', () => ({
      getRoles: () => {
        throw new Error();
      }
    }));

    const sampleService = require('../sampleService');
    const getRolesFn = () => sampleService.getRoles();

    await expect(getRolesFn).rejects.toThrow();
  });
});

describe('getRolesById', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should return the user role respective to it's id", async () => {
    jest.mock('../../repositories/sampleRepository', () => ({
      __esModule: true,
      getRoleById: jest.fn().mockImplementation(() => [{ roleId: 1, roleName: 'Normal User' }])
    }));

    const sampleService = require('../sampleService');
    const response = await sampleService.getRoleById(1);

    const expectedResponse = [{ roleId: 1, roleName: 'Normal User' }];
    expect(response).toEqual(expectedResponse);
  });

  it('should throw an error, if there is an error in repository', async () => {
    jest.doMock('../../repositories/sampleRepository', () => ({
      getRoleById: () => {
        throw new Error();
      }
    }));

    const sampleService = require('../sampleService');
    const getRoleByIdFn = () => sampleService.getRoleById();

    await expect(getRoleByIdFn).rejects.toThrow();
  });
});

describe('createRole', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should create a new role', async () => {
    jest.mock('../../repositories/sampleRepository', () => ({
      __esModule: true,
      createRole: () => [{ roleId: Number, roleName: 'testRole' }],
      getRoleById: jest.fn().mockImplementation(() => [{ roleId: Number, roleName: 'testRole' }])
    }));

    const sampleService = require('../sampleService');
    const response = await sampleService.createRole({ roleName: 'testRole' });

    const expectedResponse = [{ roleId: Number, roleName: 'testRole' }];
    expect(response).toEqual(expectedResponse);
  });

  it('should throw an error, if there is an error in repository', async () => {
    jest.doMock('../../repositories/sampleRepository', () => ({
      createRole: () => {
        throw new Error();
      }
    }));

    const sampleService = require('../sampleService');
    const createRoleFn = () => sampleService.createRole();

    await expect(createRoleFn).rejects.toThrow();
  });
});
