import { v4 as uuidv4 } from 'uuid';
import httpContext from 'express-http-context';
import { CORRELATION_ID_CONTEXT_KEY } from '../constants/configConstants';

export default function correlation(options) {
  const headerName = (options && options.header) || 'correlation-id';
  return (req, res, next) => {
    let id = req.get(headerName);
    if (!id) {
      id = uuidv4();
    }
    res.set(headerName, id);
    httpContext.set(CORRELATION_ID_CONTEXT_KEY, id);
    next();
  };
}
