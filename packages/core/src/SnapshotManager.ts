import { isPatternMatched } from './createSharedIdPattern';

export class SnapshotManager<V> {
  private snapshots = new Map<string, V>();

  public set(key: string, value: V) {
    this.snapshots.set(key, value);
  }

  public get(key: string) {
    return this.snapshots.get(key);
  }

  public remove(key: string) {
    this.snapshots.delete(key);
  }

  public has(key: string) {
    return this.snapshots.has(key);
  }

  public clear(pattern?: string) {
    if (pattern) {
      this.snapshots.forEach((_, key) => {
        if (isPatternMatched(pattern, key)) {
          this.remove(key);
        }
      });
    } else {
      this.snapshots.clear();
    }
  }
}
