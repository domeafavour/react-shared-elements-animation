import { SharedElementProps } from './typings';
import { useSharedRectAnimation } from './useSharedRectAnimation';

interface Props<T extends HTMLElement> extends SharedElementProps<T> {}

export function SharedRect<T extends HTMLElement>({
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
          width: `${previousRect.width}px`,
          height: `${previousRect.height}px`,
        },
        {
          transform: 'translate(0px, 0px)',
          width: `${currentRect.width}px`,
          height: `${currentRect.height}px`,
        },
      ],
      { duration: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    ];
  });
  return children({ ref });
}
