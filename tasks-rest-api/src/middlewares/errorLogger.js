import logger from '../utils/logger';

export default function errorLogger() {
  return (err, req, res, next) => {
    const { status, message, stack } = err;
    logger.error({ status, message, stack });
    next(err);
  };
}
