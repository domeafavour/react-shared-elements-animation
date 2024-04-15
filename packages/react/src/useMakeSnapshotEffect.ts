import { useLayoutEffect } from 'react';
import { useLatestRef } from './useLatestRef';

export const useMakeSnapshotEffect = (
  effect: () => void,
  deps?: React.DependencyList
) => {
  const latestEffectRef = useLatestRef(effect);
  return useLayoutEffect(() => () => latestEffectRef.current(), deps);
};
