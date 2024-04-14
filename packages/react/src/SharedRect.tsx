import { SharedElementProps } from './typings';
import { useSharedRectAnimation } from './useSharedRectAnimation';

export function SharedRect<T extends HTMLElement = HTMLElement>({
  children,
  sharedId,
}: SharedElementProps<T>) {
  const [ref] = useSharedRectAnimation<T>(sharedId);
  return children({ ref });
}
