import { getDOMSharedNodeRect, getDOMStyleObject } from './helpers';
import {
  AnimationOptions,
  SharedNodeRect,
  StyleKey,
  StyleObject,
} from './typings';

export abstract class BaseSharedDOMNode<V> {
  constructor(
    protected domNode: HTMLElement,
    protected styleKeys?: StyleKey[]
  ) {}

  getNodeRect = () => getDOMSharedNodeRect(this.domNode);

  getStyle = () => getDOMStyleObject(this.domNode, this.styleKeys);

  abstract animate(previousValue: V, options?: AnimationOptions): void;
}

export class SharedDOMElementNode extends BaseSharedDOMNode<{
  rect: SharedNodeRect;
  style: StyleObject;
}> {
  animate(
    previousValue: { rect: SharedNodeRect; style: StyleObject },
    options?: KeyframeAnimationOptions | undefined
  ): void {
    const currentRect = this.getNodeRect();
    const currentStyle = this.getStyle();
    const previousRect = previousValue.rect;
    const previousStyle = previousValue.style;
    const dx = previousRect.left - currentRect.left;
    const dy = previousRect.top - currentRect.top;
    this.domNode.animate(
      [
        {
          ...previousStyle,
          transform: `translate(${dx}px, ${dy}px)`,
          width: `${previousRect.width}px`,
          height: `${previousRect.height}px`,
        },
        {
          ...currentStyle,
          transform: 'translate(0px, 0px)',
          width: `${currentRect.width}px`,
          height: `${currentRect.height}px`,
        },
      ],
      options
    );
  }
}
