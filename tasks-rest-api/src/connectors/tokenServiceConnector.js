import { getServiceEndpoints } from '../config/serviceEndpoints';
import { getUserTenant } from '../utils/contextUtils';
import internalALB from './InternalALB';
import logger from '../utils/logger';
import { getFromCache } from '../cache/tokenCache';
import { getUsers } from './userServiceConnector';

export const getUserToken = async (userId) => {
  return getFromCache(`USER_TOKEN_${userId}`, async () => {
    logger.info(`generating a token for user: ${userId}`);

    const users = await getUsers();
    const { roleId, roleName } = users.find(({ userId: _userId }) => userId === _userId);

    const { tenantId, tenantIdentifier, userPoolId, region, dbIdentifier, domains } = getUserTenant();

    const payload = {
      initiator: 'INTERNAL_BFF',
      user: {
        id: userId,
        roleId,
        role: roleName
      },
      tenant: {
        tenantId,
        tenantIdentifier,
        userPoolId,
        region,
        dbIdentifier,
        domains
      }
    };

    const { TOKEN_GENERATION_SERVICE_URL } = getServiceEndpoints();
    return internalALB
      .post(`${TOKEN_GENERATION_SERVICE_URL}/token`, payload)
      .then(({ data: response }) => response.data.token);
  });
};

export const getTenantApplicationToken = async () => {
  return getFromCache(`TENANT_APP_TOKEN`, async () => {
    logger.info(`generating a tenant application token`);

    const { tenantId, tenantIdentifier, userPoolId, region, dbIdentifier, domains } = getUserTenant();

    const payload = {
      initiator: 'INTERNAL_BFF',
      tenant: {
        tenantId,
        tenantIdentifier,
        userPoolId,
        region,
        dbIdentifier,
        domains
      }
    };

    const { TOKEN_GENERATION_SERVICE_URL } = getServiceEndpoints();
    return internalALB
      .post(`${TOKEN_GENERATION_SERVICE_URL}/internal/tenantApplicationToken`, payload)
      .then(({ data: response }) => response.data.token);
  });
};
