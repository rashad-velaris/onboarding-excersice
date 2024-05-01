import Cache from './Cache';
import { nodeCacheProvider } from './provider/NodeCacheProvider';
import { USER_CACHE_TTL_SECONDS } from '../constants/cacheConstants';

const userCache = new Cache(nodeCacheProvider, 'USER_CACHE');

export const getFromCache = async (key, getValue) => {
  const value = await userCache.get(key);

  return value ?? (getValue && userCache.set(key, await getValue(), USER_CACHE_TTL_SECONDS)) ?? value;
};
