import {
  StyleKey,
  defaultKeyframeAnimationOptions,
} from '@shared-elements-animation/core';
import { useSharedElementAnimation } from './useSharedElementAnimation';

export function useSharedStyleAnimation<T extends HTMLElement = HTMLElement>(
  sharedId: string,
  styleKeys?: StyleKey[],
  options = defaultKeyframeAnimationOptions
) {
  return useSharedElementAnimation<T>(sharedId, {
    options,
    styleKeys,
  });
}
