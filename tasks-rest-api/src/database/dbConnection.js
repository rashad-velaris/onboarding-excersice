import multiPoolManager from './MultiPoolManager';
import { getDbIdentifier } from '../utils/contextUtils';
import { POOL_TYPE } from '../constants/dbConstants';
// master connection
const getDbConnection = () => multiPoolManager.getConnectionPool(getDbIdentifier(), POOL_TYPE.READ_WRITE_POOL);

// reader connection
export const getReaderDbConnection = () => multiPoolManager.getConnectionPool(getDbIdentifier(), POOL_TYPE.READ_POOL);

export default getDbConnection;
