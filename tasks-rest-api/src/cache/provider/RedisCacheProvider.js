import { RedisCacheConnection } from '../connection/RedisCacheConnection';

class RedisCacheProvider {
  constructor() {
    this.connection = new RedisCacheConnection();
  }

  __getRedisInstance() {
    return this.connection.get();
  }

  async get(key) {
    const redis = await this.__getRedisInstance();
    return redis.get(key);
  }

  async set(key, value, ttl) {
    const redis = await this.__getRedisInstance();
    return ttl ? redis.set(key, value, 'ex', 10) : redis.set(key, value);
  }
}

export const redisCacheProvider = new RedisCacheProvider();
