import { sharedElementAnimationHelper as helper } from './AnimationHelper';
import { AnimationOptions, StyleKey } from './typings';
import { useDOMAnimationHelper } from './useAnimationHelper';
import { useFromSnapshotEffect } from './useFromSnapshotEffect';
import { useMakeSnapshotEffect } from './useMakeSnapshotEffect';

export function useSharedElementAnimation<T extends HTMLElement = HTMLElement>(
  sharedId: string,
  options?: { styleKeys?: StyleKey[]; options?: AnimationOptions }
) {
  const [nodeRef, { fromSnapshot, makeSnapshot }] = useDOMAnimationHelper<
    typeof helper,
    T
  >(helper, sharedId, options);

  useFromSnapshotEffect(fromSnapshot, [sharedId]);

  useMakeSnapshotEffect(makeSnapshot, [sharedId]);

  return [nodeRef] as const;
}
