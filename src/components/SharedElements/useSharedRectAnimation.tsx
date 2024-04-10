import { useEffect, useLayoutEffect, useRef } from 'react';
import { useStoreSelector } from './context';

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
  const setRect = useStoreSelector((store) => store.setRect);
  const getRect = useStoreSelector((store) => store.getRect);

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
