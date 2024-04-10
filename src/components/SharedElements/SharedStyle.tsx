import { SharedElementProps, StyleKey } from './typings';
import { useSharedStyleAnimation } from './useSharedStyleAnimation';

interface Props<T extends HTMLElement = HTMLElement>
  extends SharedElementProps<T> {
  styleKeys?: StyleKey[];
  options?: KeyframeAnimationOptions;
}

export function SharedStyle<T extends HTMLElement = HTMLElement>({
  children,
  styleKeys,
  options,
  sharedId,
}: Props<T>) {
  const [ref] = useSharedStyleAnimation<T>(sharedId, styleKeys, options);
  return children({ ref });
}
