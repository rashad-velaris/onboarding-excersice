import { NodeCacheConnection } from '../connection/NodeCacheConnection';
import { getUserTenant } from '../../utils/contextUtils';

class NodeCacheProvider {
  constructor() {
    this.connection = new NodeCacheConnection();
  }

  __getCacheInstance() {
    return this.connection.get();
  }

  async get(key) {
    const { tenantIdentifier } = getUserTenant();
    const cache = await this.__getCacheInstance();

    return cache.get(`${tenantIdentifier}-${key}`);
  }

  async set(key, value, ttl) {
    const { tenantIdentifier } = getUserTenant();
    const cache = await this.__getCacheInstance();

    return cache.set(`${tenantIdentifier}-${key}`, value, ttl);
  }
}

export const nodeCacheProvider = new NodeCacheProvider();
