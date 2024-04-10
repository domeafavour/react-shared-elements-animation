import { createSharedElement } from './createSharedElement';

export const SharedPosition = createSharedElement({
  displayName: 'SharedPosition',
  keyframes: (previousRect, currentRect) => {
    const dx = previousRect.left - currentRect.left;
    const dy = previousRect.top - currentRect.top;
    return [
      {
        transform: `translate(${dx}px, ${dy}px)`,
      },
      {
        transform: 'translate(0px, 0px)',
      },
    ];
  },
});
