import * as responseGenerator from '../responseGenerator';

describe('createSuccessResponse', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should throw an error, if data is not defined', () => {
    const createSuccessResponseFn = () => responseGenerator.createSuccessResponse(undefined, 'dummy message');

    expect(createSuccessResponseFn).toThrow(Error);
    expect(createSuccessResponseFn).toThrow('"data" must be defined when calling createSuccessResponse');
  });

  it('should return successful response, if all inputs are correct', () => {
    const response = responseGenerator.createSuccessResponse('dummy data', 'dummy message');
    const expectedResponse = { status: 'success', message: 'dummy message', data: 'dummy data' };

    expect(response).toStrictEqual(expectedResponse);
  });
});

describe('createErrorResponse', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return message in the response, if message exists', () => {
    const response = responseGenerator.createErrorResponse('dummy error', 'dummy message', 'dummy data');

    const expectedResponse = { data: 'dummy data', message: 'dummy message', status: 'error' };
    expect(response).toStrictEqual(expectedResponse);
  });

  it('should return "Internal server Error" in the response, if message is null', () => {
    const response = responseGenerator.createErrorResponse('dummy error', null, 'dummy data');

    const expectedResponse = { data: 'dummy data', message: 'Internal server error', status: 'error' };
    expect(response).toStrictEqual(expectedResponse);
  });

  it('should not contain data field in the response, if data not exists', () => {
    const response = responseGenerator.createErrorResponse('custom error', 'dummy message', null);

    const expectedResponse = { message: 'dummy message', status: 'error' };
    expect(response).toStrictEqual(expectedResponse);
  });
});

describe('createFailResponse', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return fail response', () => {
    const response = responseGenerator.createFailResponse('dummy data');

    const expectedResponse = { data: 'dummy data', status: 'fail' };
    expect(response).toStrictEqual(expectedResponse);
  });

  it('should throw an error, if data is not defined', () => {
    const createFailResponseFn = () => responseGenerator.createFailResponse(undefined);

    expect(createFailResponseFn).toThrow(Error);
    expect(createFailResponseFn).toThrow('"data" must be defined when calling createFailResponse');
  });

  it('should return fail response with null data, if data is null', () => {
    const response = responseGenerator.createFailResponse(null);

    const expectedResponse = { data: null, status: 'fail' };
    expect(response).toStrictEqual(expectedResponse);
  });
});
