import { defaultKeyframeAnimationOptions } from './constants';
import { useSharedElementAnimation } from './useSharedElementAnimation';

export function useSharedRectAnimation<T extends HTMLElement>(
  sharedId: string,
  options = defaultKeyframeAnimationOptions
) {
  return useSharedElementAnimation<T>(sharedId, { options, styleKeys: [] });
}
