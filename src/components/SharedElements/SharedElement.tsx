import { SharedElementProps, StyleKey } from './typings';
import { useSharedElementAnimation } from './useSharedElementAnimation';

interface Props<T extends HTMLElement> extends SharedElementProps<T> {
  styleKeys?: StyleKey[];
  options?: KeyframeAnimationOptions;
}

export function SharedElement<T extends HTMLElement = HTMLElement>({
  children,
  sharedId,
  options,
  styleKeys,
}: Props<T>) {
  return children({
    ref: useSharedElementAnimation<T>(sharedId, { styleKeys, options }),
  });
}
