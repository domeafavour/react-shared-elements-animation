import { defaultKeyframeAnimationOptions } from './constants';

class SharedRectAnimationHelper {
  private cache = new Map<string, DOMRect>();

  private setRect(sharedId: string, rect: DOMRect) {
    this.cache.set(sharedId, rect);
  }

  private getRect(sharedId: string) {
    return this.cache.get(sharedId);
  }

  private removeRect(sharedId: string) {
    this.cache.delete(sharedId);
  }

  public enter<T extends HTMLElement = HTMLElement>(
    node: T | null,
    sharedId: string,
    options = defaultKeyframeAnimationOptions
  ) {
    const previousRect = this.getRect(sharedId);
    if (node && previousRect) {
      const currentRect = node.getBoundingClientRect();
      const dx = previousRect.left - currentRect.left;
      const dy = previousRect.top - currentRect.top;
      node.animate(
        [
          {
            transform: `translate(${dx}px, ${dy}px)`,
            width: `${previousRect.width}px`,
            height: `${previousRect.height}px`,
          },
          {
            transform: 'translate(0px, 0px)',
            width: `${currentRect.width}px`,
            height: `${currentRect.height}px`,
          },
        ],
        options
      );
    }
  }

  public exit<T extends HTMLElement = HTMLElement>(
    node: T | null,
    sharedId: string
  ) {
    if (node) {
      const rect = node.getBoundingClientRect();
      this.setRect(sharedId, rect);
    }
  }
}

export const sharedRectAnimationHelper = new SharedRectAnimationHelper();
