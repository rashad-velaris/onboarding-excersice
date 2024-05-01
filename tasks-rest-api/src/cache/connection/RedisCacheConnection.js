import Redis from 'ioredis';
import logger from '../../utils/logger';
import { getUserTenant } from '../../utils/contextUtils';
import VelarisSSMClient from '../../client/VelarisSSMClient';
import { REDIS_CONN_CONFIG } from '../../constants/cacheConstants';

export class RedisCacheConnection {
  constructor() {
    this.multiRedisPool = {};
  }

  async get() {
    const { tenantIdentifier } = getUserTenant();
    const connection = this.multiRedisPool[tenantIdentifier];

    if (connection) {
      return connection;
    }
    if (connection === false) {
      // no credentials, this check avoids multiple ssm calls if a tenant has no keys.
      return null;
    }

    logger.info(`RedisPool: Attempting creation of redis connection for: ${tenantIdentifier}`);

    const redisConfig = await VelarisSSMClient.getRedisCredentials(tenantIdentifier);

    if (!redisConfig) {
      logger.info('RedisPool: No redis config configured in SSM');
      this.multiRedisPool[tenantIdentifier] = false;

      return null;
    }
    const { host, port, password, username } = redisConfig;

    if (!host && !port) {
      logger.info('RedisPool: Host and port not configured');
      this.multiRedisPool[tenantIdentifier] = false;

      return null;
    }
    if (username && password) {
      logger.info(`RedisPool: Creating TLS connection`);
      const REDIS_CONN_STRING = `rediss://${host}:${port}/4?allowUsernameInURI=true`;
      logger.info('RedisPool: Connection string: ', REDIS_CONN_STRING);

      this.multiRedisPool[tenantIdentifier] = new Redis(REDIS_CONN_STRING, REDIS_CONN_CONFIG);
    } else {
      logger.info(`RedisPool: Creating NON-TLS connection`);
      this.multiRedisPool[tenantIdentifier] = new Redis(port, host, REDIS_CONN_CONFIG);
    }

    return this.multiRedisPool[tenantIdentifier];
  }
}
