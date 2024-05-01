import { StatusCodes } from 'http-status-codes';
import httpContext from 'express-http-context';
import { createErrorResponse } from '../utils/responseGenerator';
import ApiException from '../exceptions/ApiException';

const { INTERNAL_SERVER_ERROR } = StatusCodes;

export default function errorHandler() {
  return (err, req, res, next) => {
    if (err instanceof ApiException) {
      const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
      return res.status(statusCode).send(createErrorResponse(err));
    }

    if (err instanceof Error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send(
          createErrorResponse(
            err,
            `Internal server error. Please report incident id : ${httpContext.get('correlation-id')}`
          )
        );
    }
    return next(err);
  };
}
