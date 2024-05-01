import Cache from './Cache';
import { nodeCacheProvider } from './provider/NodeCacheProvider';
import { TOKEN_CACHE_TTL_SECONDS } from '../constants/cacheConstants';

const tokenCache = new Cache(nodeCacheProvider, 'TOKEN_CACHE');

export const getFromCache = async (key, getValue) => {
  const value = await tokenCache.get(key);

  return value ?? (getValue && tokenCache.set(key, await getValue(), TOKEN_CACHE_TTL_SECONDS)) ?? value;
};
