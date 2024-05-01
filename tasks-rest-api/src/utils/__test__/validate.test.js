import Joi from '@hapi/joi';
import validate from '../validate';

describe('validate', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return no errors, if validation is passed', () => {
    const schema = Joi.object({
      id: Joi.number().required()
    });

    const response = validate({ id: 1 }, schema);

    expect(response.isError).toEqual(false);
  });

  it('should return an error, if validation is failed', async () => {
    const schema = Joi.object({
      id: Joi.number().required()
    });

    const response = validate({}, schema);

    expect(response.isError).toEqual(true);
  });
});
