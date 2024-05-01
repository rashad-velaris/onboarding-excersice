import InvalidRequestException from '../exceptions/InvalidRequestException';

export function validateTask(req, res, next) {
  try {
    const { body } = req;
    if (!body.title) {
      next(new InvalidRequestException('title is required', 403));
    }
    if (typeof body.title !== 'string') {
      next(new InvalidRequestException('title must be a string', 403));
    }

    next();
  } catch (err) {
    next(err);
  }
}
