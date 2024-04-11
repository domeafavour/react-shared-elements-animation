import { useEffect, useLayoutEffect, useRef } from 'react';
import { sharedRectAnimationHelper } from './SharedRectAnimationHelper';
import { defaultKeyframeAnimationOptions } from './constants';

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
      nodeRef.current,
      sharedId,
      latestOptionsRef.current
    );
  }, [sharedId]);

  useLayoutEffect(
    () => () => {
      sharedRectAnimationHelper.exit(nodeRef.current, sharedId);
    },
    [sharedId]
  );
  return [nodeRef] as const;
}
