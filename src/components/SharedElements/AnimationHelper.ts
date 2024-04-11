export class AnimationHelper<T> {
  private cache = new Map<string, T>();

  protected setCache(key: string, value: T) {
    this.cache.set(key, value);
  }

  protected getCache(key: string) {
    return this.cache.get(key);
  }

  protected removeCache(key: string) {
    this.cache.delete(key);
  }
}
