import { StatusCodes } from 'http-status-codes';
import ApiException from './ApiException';

const { UNAUTHORIZED } = StatusCodes;

export default class UnauthorizedException extends ApiException {
  constructor(message, statusCode = UNAUTHORIZED, errorCode = UNAUTHORIZED) {
    super(message, statusCode, errorCode);
    this.name = 'unauthorizedException';
  }
}
