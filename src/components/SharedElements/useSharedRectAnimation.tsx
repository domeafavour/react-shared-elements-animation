import { useEffect, useLayoutEffect, useRef } from 'react';

const SHARED_RECTS = new Map<string, DOMRect>();

function getRect(sharedId: string) {
  return SHARED_RECTS.get(sharedId) ?? null;
}

function setRect(sharedId: string, rect: DOMRect) {
  SHARED_RECTS.set(sharedId, rect);
}

export function useSharedRectAnimation<T extends HTMLElement>(
  sharedId: string,
  animateParams: (
    previousRect: DOMRect,
    currentRect: DOMRect
  ) => Parameters<typeof Element.prototype.animate>
) {
  const latestAnimateParamsRef = useRef(animateParams);
  useEffect(() => {
    latestAnimateParamsRef.current = animateParams;
  });
  const nodeRef = useRef<T | null>(null);

  useEffect(() => {
    const node = nodeRef.current;
    const previousRect = getRect(sharedId);
    if (previousRect && node) {
      const currentRect = node.getBoundingClientRect();
      node.animate(
        ...latestAnimateParamsRef.current(previousRect, currentRect)
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
