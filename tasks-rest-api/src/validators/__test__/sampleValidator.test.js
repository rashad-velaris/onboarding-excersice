/* eslint-disable global-require */

describe('validateGetRoleByIdRq', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should call next() once with an error, if validations are failed', () => {
    const req = { params: { id: 'a' } };
    const next = jest.fn();
    jest.mock('../../utils/validate', () => ({
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return { ErrorMessage: '', isError: true };
      })
    }));

    const sampleValidator = require('../sampleValidator');
    sampleValidator.validateGetRoleByIdRq(req, {}, next);

    expect(next).toBeCalledTimes(1);
    expect(next.mock.calls[0][0].name).toBe('InvalidRequestException');
  });

  it('should call next() once, if validations are passed', () => {
    const req = { params: { id: 1 } };
    const next = jest.fn();
    jest.mock('../../utils/validate', () => ({
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return { ErrorMessage: null, isError: false };
      })
    }));

    const sampleValidator = require('../sampleValidator');
    sampleValidator.validateGetRoleByIdRq(req, {}, next);

    expect(next).toBeCalledTimes(1);
  });
});

describe('validateCreateRoleRq', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should call next() once with an error, if validations are failed', () => {
    const req = { body: { roleName: 1 } };
    const next = jest.fn();
    jest.mock('../../utils/validate', () => ({
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return { ErrorMessage: '', isError: true };
      })
    }));

    const sampleValidator = require('../sampleValidator');
    sampleValidator.validateCreateRoleRq(req, {}, next);

    expect(next).toBeCalledTimes(1);
    expect(next.mock.calls[0][0].name).toBe('InvalidRequestException');
  });

  it('should call next() once, if validations are passed', () => {
    const req = { body: { roleName: 'testRoleName' } };
    const next = jest.fn();
    jest.mock('../../utils/validate', () => ({
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return { ErrorMessage: null, isError: false };
      })
    }));

    const sampleValidator = require('../sampleValidator');
    sampleValidator.validateCreateRoleRq(req, {}, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
