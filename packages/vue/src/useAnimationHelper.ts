import {
  BaseAnimationHelper,
  UseAnimationHelperOptions,
  createSharedDOMElementNode,
} from '@shared-elements-animation/core';
import { Ref, computed, ref } from 'vue';

export function useDOMAnimationHelper<
  H extends BaseAnimationHelper<any>,
  T extends HTMLElement = HTMLElement,
>(
  animationHelper: H,
  sharedId: Ref<string>,
  options?: UseAnimationHelperOptions
) {
  const nodeRef = ref<T | null>(null);

  const hasSnapshot = computed(() =>
    animationHelper.hasSnapshot(sharedId.value)
  );

  function createSharedNode() {
    return createSharedDOMElementNode(nodeRef.value, options?.styleKeys);
  }

  function fromSnapshot() {
    animationHelper.fromSnapshot(
      createSharedNode(),
      sharedId.value,
      options?.options
    );
  }

  function makeSnapshot() {
    animationHelper.makeSnapshot(createSharedNode(), sharedId.value);
  }

  return [nodeRef, { hasSnapshot, fromSnapshot, makeSnapshot }] as const;
}
