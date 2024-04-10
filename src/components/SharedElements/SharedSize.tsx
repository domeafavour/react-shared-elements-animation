import { SharedElementProps } from './typings';
import { useSharedRectAnimation } from './useSharedRectAnimation';

interface Props<T extends HTMLElement> extends SharedElementProps<T> {}

export function SharedSize<T extends HTMLElement>({
  sharedId,
  children,
}: Props<T>) {
  const [ref] = useSharedRectAnimation<T>(
    sharedId,
    (previousRect, currentRect) => {
      return [
        [
          {
            width: `${previousRect.width}px`,
            height: `${previousRect.height}px`,
          },
          {
            width: `${currentRect.width}px`,
            height: `${currentRect.height}px`,
          },
        ],
        { duration: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      ];
    }
  );
  return children({ ref });
}
