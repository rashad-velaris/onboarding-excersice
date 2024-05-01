class Cache {
  constructor(provider, namespace) {
    this.provider = provider;
    this.namespace = namespace;
  }

  get(key) {
    return this.provider.get(`${this.namespace}-${key}`);
  }

  set(key, value, ttl) {
    this.provider.set(`${this.namespace}-${key}`, value, ttl);
    return value;
  }
}

export default Cache;
