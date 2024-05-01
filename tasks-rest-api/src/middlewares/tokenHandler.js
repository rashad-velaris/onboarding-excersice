import httpContext from 'express-http-context';
import { verify } from 'jsonwebtoken';
import { appendExceptionStack } from '../utils/exceptionUtils';
import { BASE_URL, ENV, IMMEDIATE_LOG_FORMAT } from '../config/configs';
import { AUTHORIZATION_CONTEXT_KEY, USER_DETAILS_CONTEXT_KEY } from '../constants/configConstants';
import { getPublicKey } from '../config/configHelper';
import UnauthorizedException from '../exceptions/UnauthorizedException';
import { processTemplate } from '../utils/stringUtils';
import logger from '../utils/logger';

const ALGORITHM = 'RS256';
const ISSUER = `velaris-${ENV}-token-generation-service`;

const unsecuredEndpoints = {
  [`${BASE_URL}/health`]: { method: 'GET' }
};

function isUnsecuredEndpoint(originalUrl, method) {
  return Object.hasOwn(unsecuredEndpoints, originalUrl) && method === unsecuredEndpoints[originalUrl].method;
}

export default function tokenHandler() {
  return async (req, res, next) => {
    if (isUnsecuredEndpoint(req.originalUrl, req.method)) {
      logger.info(processTemplate(IMMEDIATE_LOG_FORMAT, req));
      return next();
    }
    const authorizationToken = req.headers.authorization;

    if (!authorizationToken) {
      logger.info(processTemplate(IMMEDIATE_LOG_FORMAT, req));
      return next(new UnauthorizedException('Authorization token missing from the header'));
    }
    try {
      const decoded = verify(authorizationToken, getPublicKey(), { algorithms: [ALGORITHM], issuer: ISSUER });
      const { user, tenant } = decoded;
      httpContext.set(USER_DETAILS_CONTEXT_KEY, { user, tenant });
      httpContext.set(AUTHORIZATION_CONTEXT_KEY, authorizationToken);
      return next();
    } catch (error) {
      logger.info(processTemplate(IMMEDIATE_LOG_FORMAT, req));
      if (error.name && ['JsonWebTokenError', 'NotBeforeError', 'TokenExpiredError'].includes(error.name)) {
        return next(new UnauthorizedException(error.message));
      }
      return next(appendExceptionStack(error));
    }
  };
}
