import React from 'react';
import { SharedElementProps, SharedElementType } from './typings';
import { useSharedRectAnimation } from './useSharedRectAnimation';

type KeyframesFn = (previousRect: DOMRect, currentRect: DOMRect) => Keyframe[];

function defaultKeyframes(previousRect: DOMRect, currentRect: DOMRect) {
  const dx = previousRect.left - currentRect.left;
  const dy = previousRect.top - currentRect.top;
  return [
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
  ];
}

const defaultKeyframeAnimationOptions: KeyframeAnimationOptions = {
  duration: 500,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

export function createSharedElement<T extends HTMLElement = HTMLElement>(
  options: {
    displayName?: string;
    keyframes?: KeyframesFn;
  } & KeyframeAnimationOptions
) {
  const {
    displayName,
    keyframes = defaultKeyframes,
    ...keyframeAnimationOptions
  } = options ?? {};

  const animationOptions = {
    ...defaultKeyframeAnimationOptions,
    ...keyframeAnimationOptions,
  };

  const SharedElement: React.FC<SharedElementProps<T>> = ({
    sharedId,
    children,
  }) => {
    const [ref] = useSharedRectAnimation<T>(
      sharedId,
      (previousRect, currentRect) => [
        keyframes(previousRect, currentRect),
        animationOptions,
      ]
    );
    return children({ ref });
  };

  if (displayName) {
    SharedElement.displayName = displayName;
  }

  return SharedElement as SharedElementType;
}
