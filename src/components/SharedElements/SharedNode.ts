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

export class SharedDOMRectNode extends BaseSharedDOMNode<SharedNodeRect> {
  public animate = (
    previousRect: SharedNodeRect,
    options: AnimationOptions
  ): void => {
    const currentRect = this.getNodeRect();
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
  };
}

export class SharedDOMStyleNode extends BaseSharedDOMNode<StyleObject> {
  public animate = (
    previousStyle: StyleObject,
    options?: AnimationOptions
  ): void => {
    const currentStyle = this.getStyle();
    this.domNode.animate(
      [previousStyle as Keyframe, currentStyle as Keyframe],
      options
    );
  };
}
