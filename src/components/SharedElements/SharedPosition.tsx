import React from 'react';
import { useSharedRectAnimation } from './useSharedRectAnimation';

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
  const [ref] = useSharedRectAnimation<T>(id, (previousRect, currentRect) => {
    const dx = previousRect.left - currentRect.left;
    const dy = previousRect.top - currentRect.top;
    return [
      [
        {
          transform: `translate(${dx}px, ${dy}px)`,
        },
        {
          transform: 'translate(0px, 0px)',
        },
      ],
      { duration: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    ];
  });
  return children({ ref });
}
