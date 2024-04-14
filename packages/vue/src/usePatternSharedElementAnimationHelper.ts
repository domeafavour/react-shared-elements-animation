import {
  AnimationOptions,
  StyleKey,
  generateFromPattern,
} from '@shared-elements-animation/core';
import { useDOMAnimationHelper } from './useAnimationHelper';
import { sharedElementAnimationHelper } from './sharedElementAnimationHelper';
import { Ref, computed } from 'vue';

export function usePatternSharedElementAnimationHelper<
  T extends HTMLElement = HTMLElement,
  P extends object = object,
>(
  pattern: string,
  params: P,
  options?: { styleKeys?: StyleKey[]; options?: AnimationOptions }
) {
  const sharedId = computed(() => generateFromPattern(pattern, params));

  const [nodeRef, helper] = useDOMAnimationHelper(
    sharedElementAnimationHelper,
    sharedId,
    options
  );

  const makeSnapshot = () => {
    sharedElementAnimationHelper.clearSnapshots(pattern);
    helper.makeSnapshot();
  };

  return [nodeRef as Ref<T | null>, { ...helper, makeSnapshot }] as const;
}
