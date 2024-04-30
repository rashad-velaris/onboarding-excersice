import { ValidationError } from '../validators/taskValidator.js';

export default function errorHandler() {
  return (err, req, res, next) => {
    if (err instanceof ValidationError) {
      const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
      return res.status(statusCode).send({ message: err.message });
    }
    return next(err);
  };
}
