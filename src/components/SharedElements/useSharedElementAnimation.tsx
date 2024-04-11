import { useEffect, useLayoutEffect, useRef } from 'react';
import { sharedElementAnimationHelper } from './AnimationHelper';
import { SharedDOMElementNode } from './SharedNode';
import { defaultKeyframeAnimationOptions } from './constants';
import { AnimationOptions, StyleKey } from './typings';

export function createSharedDOMElementNode<T extends HTMLElement>(
  domNode: T | null,
  styleKeys?: StyleKey[]
) {
  return domNode ? new SharedDOMElementNode(domNode, styleKeys) : null;
}

export function useSharedElementAnimation<T extends HTMLElement = HTMLElement>(
  sharedId: string,
  options?: { styleKeys?: StyleKey[]; options?: AnimationOptions }
) {
  const {
    styleKeys,
    options: animationOptions = defaultKeyframeAnimationOptions,
  } = options ?? {};
  const nodeRef = useRef<T | null>(null);
  const latestStyleKeysRef = useRef(styleKeys);
  const latestAnimationOptionsRef = useRef(animationOptions);

  useEffect(() => {
    latestStyleKeysRef.current = styleKeys;
    latestAnimationOptionsRef.current = animationOptions;
  });

  useLayoutEffect(() => {
    sharedElementAnimationHelper.enter(
      createSharedDOMElementNode(nodeRef.current, latestStyleKeysRef.current),
      sharedId,
      latestAnimationOptionsRef.current
    );

    return () => {
      sharedElementAnimationHelper.exit(
        createSharedDOMElementNode(nodeRef.current, latestStyleKeysRef.current),
        sharedId
      );
    };
  }, [sharedId]);

  return [nodeRef] as const;
}
