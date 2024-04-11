import {
  BaseSharedDOMNode,
  SharedDOMElementNode,
  SharedDOMRectNode,
  SharedDOMStyleNode,
} from './SharedNode';
import { defaultKeyframeAnimationOptions } from './constants';
import { AnimationOptions, StyleObject } from './typings';

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
    options?: KeyframeAnimationOptions | undefined
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

class SharedRectAnimationHelper extends DOMAnimationHelper<SharedDOMRectNode> {
  public enter(
    sharedNode: SharedDOMRectNode | null,
    sharedId: string,
    options = defaultKeyframeAnimationOptions
  ) {
    const previousRect = this.getCache(sharedId);

    if (sharedNode && previousRect) {
      sharedNode.animate(previousRect, options);
    }
  }

  public exit(sharedNode: SharedDOMRectNode | null, sharedId: string) {
    if (sharedNode) {
      this.setCache(sharedId, sharedNode.getNodeRect());
    }
  }
}

export const sharedRectAnimationHelper = new SharedRectAnimationHelper();

class SharedStyleAnimationHelper extends DOMAnimationHelper<SharedDOMStyleNode> {
  public enter(
    sharedNode: SharedDOMStyleNode | null,
    sharedId: string,
    options = defaultKeyframeAnimationOptions
  ) {
    const previousRect = this.getCache(sharedId);
    if (sharedNode && previousRect) {
      sharedNode.animate(previousRect, options);
    }
  }

  public exit(sharedNode: SharedDOMStyleNode | null, sharedId: string) {
    if (sharedNode) {
      this.setCache(sharedId, sharedNode.getStyle());
    }
  }
}

export const sharedStyleAnimationHelper = new SharedStyleAnimationHelper();