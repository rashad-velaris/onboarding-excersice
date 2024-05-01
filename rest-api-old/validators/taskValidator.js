export class ValidationError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.statusCode = statusCode;
  }
}

export function validateTask(req, res, next) {
  try {
    let { body } = req;
    if (!body.title) {
      return next(new ValidationError('title is required', 403));
    }
    if (typeof body.title !== 'string') {
      return next(new ValidationError('title must be a string', 403));
    }

    next();
  } catch (err) {
    next(err);
  }
}
