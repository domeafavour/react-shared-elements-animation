import { createSharedElement } from './createSharedElement';

export const SharedSize = createSharedElement({
  displayName: 'SharedSize',
  keyframes: (previousRect, currentRect) => [
    {
      width: `${previousRect.width}px`,
      height: `${previousRect.height}px`,
    },
    {
      width: `${currentRect.width}px`,
      height: `${currentRect.height}px`,
    },
  ],
});
