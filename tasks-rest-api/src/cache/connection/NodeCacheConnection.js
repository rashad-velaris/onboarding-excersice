import NodeCache from 'node-cache';
import { NODE_CACHE_CONFIG } from '../../constants/cacheConstants';

export class NodeCacheConnection {
  constructor() {
    this.nodeCache = null;
  }

  async get() {
    if (!this.nodeCache) {
      this.nodeCache = new NodeCache(NODE_CACHE_CONFIG);
    }
    return this.nodeCache;
  }
}
