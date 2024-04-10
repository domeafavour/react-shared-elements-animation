import { useEffect, useLayoutEffect, useRef } from 'react';
import { defaultKeyframeAnimationOptions } from './constants';

const SHARED_RECTS = new Map<string, DOMRect>();

function getRect(sharedId: string) {
  return SHARED_RECTS.get(sharedId) ?? null;
}

function setRect(sharedId: string, rect: DOMRect) {
  SHARED_RECTS.set(sharedId, rect);
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
    const node = nodeRef.current;
    const previousRect = getRect(sharedId);
    if (previousRect && node) {
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
        latestOptionsRef.current
      );
    }
  }, [sharedId]);

  useLayoutEffect(
    () => () => {
      const node = nodeRef.current;
      if (node) {
        const client = node.getBoundingClientRect();
        setRect(sharedId, client);
      }
    },
    [sharedId]
  );
  return [nodeRef] as const;
}
