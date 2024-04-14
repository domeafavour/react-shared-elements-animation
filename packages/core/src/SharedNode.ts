import { getDOMSharedNodeRect, getDOMStyleObject } from './helpers';
import {
  AnimationOptions,
  AnimationValue,
  SharedNodeRect,
  StyleKey,
  StyleObject,
} from './typings';

export abstract class BaseSharedNode<V> {
  abstract getNodeRect(): SharedNodeRect;

  abstract getStyle(): StyleObject;

  abstract animate(previousValue: V, options?: AnimationOptions): void;
}

export abstract class BaseSharedDOMNode<V> extends BaseSharedNode<V> {
  constructor(
    protected domNode: HTMLElement,
    protected styleKeys?: StyleKey[]
  ) {
    super();
  }

  getNodeRect = () => getDOMSharedNodeRect(this.domNode);

  getStyle = () => getDOMStyleObject(this.domNode, this.styleKeys);

  abstract animate(previousValue: V, options?: AnimationOptions): void;
}

export class SharedDOMElementNode extends BaseSharedDOMNode<AnimationValue> {
  animate(
    previousValue: AnimationValue,
    options?: KeyframeAnimationOptions | undefined
  ): void {
    const currentRect = this.getNodeRect();
    const previousRect = previousValue.rect;
    const dx = previousRect.left - currentRect.left;
    const dy = previousRect.top - currentRect.top;
    this.domNode.animate(
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

    const previousStyle = previousValue.style;
    const currentStyle = this.getStyle();
    if (Object.keys(previousStyle).length && Object.keys(currentStyle).length) {
      this.domNode.animate([previousStyle, currentStyle], options);
    }
  }
}
