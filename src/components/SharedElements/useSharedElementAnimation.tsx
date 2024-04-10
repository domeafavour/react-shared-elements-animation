import { useComposedRef } from '@/hooks/useComposedRef';
import { defaultKeyframeAnimationOptions } from './constants';
import { StyleKey } from './typings';
import { useSharedRectAnimation } from './useSharedRectAnimation';
import { useSharedStyleAnimation } from './useSharedStyleAnimation';

export function useSharedElementAnimation<T extends HTMLElement = HTMLElement>(
  sharedId: string,
  options?: { styleKeys?: StyleKey[]; options?: KeyframeAnimationOptions }
) {
  const {
    styleKeys = [],
    options: animationOptions = defaultKeyframeAnimationOptions,
  } = options ?? {};
  const [rectAnimationRef] = useSharedRectAnimation<T>(sharedId);
  const [styleAnimationRef] = useSharedStyleAnimation<T>(
    sharedId,
    styleKeys,
    animationOptions
  );
  return [useComposedRef(rectAnimationRef, styleAnimationRef)] as const;
}
