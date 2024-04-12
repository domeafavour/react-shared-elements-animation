import { BaseSharedDOMNode, SharedDOMElementNode } from './SharedNode';
import { defaultKeyframeAnimationOptions } from './constants';
import { createSharedIdPattern } from './createSharedIdPattern';
import { AnimationOptions } from './typings';

type InferSharedDOMNodeValue<T> = T extends BaseSharedDOMNode<infer V>
  ? V
  : never;

export abstract class DOMAnimationHelper<N extends BaseSharedDOMNode<any>> {
  private cache = new Map<string, InferSharedDOMNodeValue<N>>();

  public setCache(key: string, value: InferSharedDOMNodeValue<N>) {
    this.cache.set(key, value);
  }

  public getCache(key: string) {
    return this.cache.get(key);
  }

  public removeCache(key: string) {
    this.cache.delete(key);
  }

  public hasCache(key: string) {
    return this.cache.has(key);
  }

  public getCacheKeys() {
    return Array.from(this.cache.keys());
  }

  public abstract enter(
    sharedNode: N | null,
    sharedId: string,
    options?: AnimationOptions
  ): void;

  public abstract exit(sharedNode: N | null, sharedId: string): void;
}

export class SharedElementAnimationHelper extends DOMAnimationHelper<SharedDOMElementNode> {
  public enter(
    sharedNode: SharedDOMElementNode | null,
    sharedId: string,
    options = defaultKeyframeAnimationOptions
  ): void {
    const previousValue = this.getCache(sharedId);
    if (sharedNode && previousValue) {
      sharedNode.animate(previousValue, options);
    }
  }

  public exit(sharedNode: SharedDOMElementNode | null, sharedId: string): void {
    if (sharedNode) {
      this.setCache(sharedId, {
        rect: sharedNode.getNodeRect(),
        style: sharedNode.getStyle(),
      });
    }
  }
}

export const sharedElementAnimationHelper = new SharedElementAnimationHelper();

export class DynamicSharedElementAnimationHelper<
  P extends object = object
> extends SharedElementAnimationHelper {
  private sharedIdPattern: ReturnType<typeof createSharedIdPattern>;

  constructor(pattern: string) {
    super();
    this.sharedIdPattern = createSharedIdPattern(pattern);
  }

  public resolveSharedId(params: P) {
    return this.sharedIdPattern.generate(params);
  }

  public exit(sharedNode: SharedDOMElementNode | null, sharedId: string): void {
    if (this.sharedIdPattern.isMatched(sharedId)) {
      const cacheKeys = this.getCacheKeys();
      cacheKeys.forEach((cacheKey) => {
        if (this.sharedIdPattern.isMatched(cacheKey) && cacheKey !== sharedId) {
          this.removeCache(cacheKey);
        }
      });
    }
    super.exit(sharedNode, sharedId);
  }
}
