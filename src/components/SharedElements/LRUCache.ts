export class LRUCache<V> {
  private cache = new Map<string, V>();

  constructor(private maxSize: number) {}

  has(key: string) {
    return this.cache.has(key);
  }

  get(key: string) {
    const value = this.cache.get(key);
    if (value) {
      // Move the key to the end of the cache
      this.cache.delete(key);
      this.set(key, value);
    }
    return value;
  }

  set(key: string, value: V) {
    if (this.cache.size >= this.maxSize) {
      // Remove the first key in the cache
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}
