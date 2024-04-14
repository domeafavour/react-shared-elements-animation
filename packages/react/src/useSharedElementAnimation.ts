import { AnimationOptions, StyleKey } from '@shared-elements-animation/core';
import { sharedElementAnimationHelper } from './sharedElementAnimationHelper';
import { useDOMAnimationHelper } from './useAnimationHelper';
import { useFromSnapshotEffect } from './useFromSnapshotEffect';
import { useMakeSnapshotEffect } from './useMakeSnapshotEffect';

export function useSharedElementAnimation<T extends HTMLElement = HTMLElement>(
  sharedId: string,
  options?: { styleKeys?: StyleKey[]; options?: AnimationOptions }
) {
  const [nodeRef, { fromSnapshot, makeSnapshot }] = useDOMAnimationHelper<
    typeof sharedElementAnimationHelper,
    T
  >(sharedElementAnimationHelper, sharedId, options);

  useFromSnapshotEffect(fromSnapshot, [sharedId]);

  useMakeSnapshotEffect(makeSnapshot, [sharedId]);

  return [nodeRef] as const;
}
