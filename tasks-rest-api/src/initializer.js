import logger from './utils/logger';
import { fetchSecrets } from './config/configHelper';
import { fetchServiceEndpoints } from './config/serviceEndpoints';

export default async function initializer() {
  logger.info('Initialization start');
  try {
    await Promise.all([fetchSecrets(), fetchServiceEndpoints()]);
    logger.info('Initialization complete');
  } catch (error) {
    logger.error('Initialization error');
    throw error;
  }
}
