import winston from 'winston';
import httpContext from 'express-http-context';
import { USER_DETAILS_CONTEXT_KEY } from '../constants/configConstants';
import { ENV } from '../config/configs';

const logTemplate = (info) => {
  const { level, timestamp, stack, message, ...rest } = info;
  const userDetails = httpContext.get(USER_DETAILS_CONTEXT_KEY);
  const correlationId = httpContext.get('correlation-id') || 'NO_CORRELATION';
  const tenantCode = userDetails ? userDetails.tenant.tenantIdentifier : 'NO_TENANT';
  if (stack) {
    const _rest = JSON.stringify(rest, (_, value) => (!value ? 'null' : value));
    const additionalInfo = Object.keys(_rest).length ? `\nAdditional Error Info: ${_rest}` : '';
    return `${level}|${correlationId}|${tenantCode}|${timestamp}:${message}\n${stack}${additionalInfo}`;
  }
  return `${level}|${correlationId}|${tenantCode}|${timestamp}:${message}`;
};

/**
 * Create a new winston logger.
 */
const level = ENV === 'dev' ? 'debug' : 'info';
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(logTemplate)
      ),
      level
    })
  ]
});

export const logStream = {
  /**
   * A writable stream for winston logger.
   *
   * @param {any} message
   */
  write(message) {
    logger.info(message.toString());
  }
};

export default logger;
