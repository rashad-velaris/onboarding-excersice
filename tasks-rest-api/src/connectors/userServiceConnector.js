import { getServiceEndpoints } from '../config/serviceEndpoints';
import internalALB from './InternalALB';
import { getFromCache } from '../cache/userCache';
import logger from '../utils/logger';

export const getUsers = async () => {
  return getFromCache('USERS_ALL', () => {
    logger.info(`retrieving user details from user service`);
    const { USER_MANAGEMENT_SERVICE_URL } = getServiceEndpoints();
    return internalALB.get(`${USER_MANAGEMENT_SERVICE_URL}/users`).then(({ data }) => data.data.users);
  });
};
