import velarisSSMClient from '../client/VelarisSSMClient';
import logger from '../utils/logger';

const env = process.env.ENV;

let serviceEndpoints = null;

/**
 * Initializes service endpoints (URLs) using configuration (service registry)
 * fetched from Systems Manager Parameter Store.
 */
export const fetchServiceEndpoints = async () => {
  if (!['dev', 'qa', 'stage', 'perf', 'prod'].includes(env)) {
    throw new Error('Env not specified, can not fetch config');
  }
  logger.info('Initializing service endpoints');
  const serviceRegistry = await velarisSSMClient.getServiceRegistry();
  serviceEndpoints = { ...serviceRegistry };
  logger.info('Service endpoints initialized');
};

export const getServiceEndpoints = () => {
  if (serviceEndpoints) {
    return serviceEndpoints;
  }
  throw new Error('Service Endpoints Not Available');
};
