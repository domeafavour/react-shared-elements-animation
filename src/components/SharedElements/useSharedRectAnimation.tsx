import { useEffect, useLayoutEffect, useRef } from 'react';
import { sharedRectAnimationHelper } from './AnimationHelper';
import { defaultKeyframeAnimationOptions } from './constants';
import { SharedDOMRectNode } from './SharedNode';

export function createSharedDOMRectNode<T extends HTMLElement>(
  domNode: T | null
) {
  return domNode ? new SharedDOMRectNode(domNode) : null;
}

export function useSharedRectAnimation<T extends HTMLElement>(
  sharedId: string,
  options = defaultKeyframeAnimationOptions
) {
  const nodeRef = useRef<T | null>(null);
  const latestOptionsRef = useRef(options);
  useEffect(() => {
    latestOptionsRef.current = options;
  });

  useEffect(() => {
    sharedRectAnimationHelper.enter(
      createSharedDOMRectNode(nodeRef.current),
      sharedId,
      latestOptionsRef.current
    );
  }, [sharedId]);

  useLayoutEffect(
    () => () => {
      sharedRectAnimationHelper.exit(
        createSharedDOMRectNode(nodeRef.current),
        sharedId
      );
    },
    [sharedId]
  );
  return [nodeRef] as const;
}
