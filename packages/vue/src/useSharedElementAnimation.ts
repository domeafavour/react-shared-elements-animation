import { AnimationOptions, StyleKey } from '@shared-elements-animation/core';
import { Ref, onMounted, onUnmounted } from 'vue';
import { sharedElementAnimationHelper } from './sharedElementAnimationHelper';
import { useDOMAnimationHelper } from './useAnimationHelper';

export function useSharedElementAnimation<T extends HTMLElement = HTMLElement>(
  sharedId: Ref<string>,
  options?: { styleKeys?: StyleKey[]; options?: AnimationOptions }
) {
  const [nodeRef, { fromSnapshot, makeSnapshot }] = useDOMAnimationHelper<
    typeof sharedElementAnimationHelper,
    T
  >(sharedElementAnimationHelper, sharedId, options);

  onMounted(() => {
    fromSnapshot();
  });

  onUnmounted(() => {
    makeSnapshot();
  });

  return [nodeRef] as const;
}
