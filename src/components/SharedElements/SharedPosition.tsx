import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useStoreSelector } from './context';

interface Props<T extends HTMLElement> {
  sharedId: string;
  children: (props: {
    ref: React.MutableRefObject<T | null>;
  }) => React.ReactNode;
}

export function SharedPosition<T extends HTMLElement>({
  sharedId: id,
  children,
}: Props<T>) {
  const ref = useRef<T | null>(null);
  const setRect = useStoreSelector((store) => store.setRect);
  const getRect = useStoreSelector((store) => store.getRect);

  useEffect(() => {
    const node = ref.current;
    const previousRect = getRect(id);
    if (previousRect && node) {
      const currentRect = node.getBoundingClientRect();
      const dx = previousRect.left - currentRect.left;
      const dy = previousRect.top - currentRect.top;

      node.animate(
        [
          {
            transform: `translate(${dx}px, ${dy}px)`,
          },
          {
            transform: 'translate(0px, 0px)',
          },
        ],
        {
          duration: 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }
      );
    }
  }, [id]);

  useLayoutEffect(
    () => () => {
      const node = ref.current;
      if (node) {
        const client = node.getBoundingClientRect();
        setRect(id, client);
      }
    },
    [id]
  );
  return children({ ref });
}
