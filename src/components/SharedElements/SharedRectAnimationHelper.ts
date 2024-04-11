import { AnimationHelper } from './AnimationHelper';
import { defaultKeyframeAnimationOptions } from './constants';

class SharedRectAnimationHelper extends AnimationHelper<DOMRect> {
  public enter<T extends HTMLElement = HTMLElement>(
    node: T | null,
    sharedId: string,
    options = defaultKeyframeAnimationOptions
  ) {
    const previousRect = this.getCache(sharedId);
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
      this.setCache(sharedId, rect);
    }
  }
}

export const sharedRectAnimationHelper = new SharedRectAnimationHelper();
