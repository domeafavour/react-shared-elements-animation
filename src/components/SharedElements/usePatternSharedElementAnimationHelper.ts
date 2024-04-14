import { useCallback } from 'react';
import { sharedElementAnimationHelper as animationHelper } from './AnimationHelper';
import { generateFromPattern } from './createSharedIdPattern';
import { AnimationOptions, StyleKey } from './typings';
import { useDOMAnimationHelper } from './useAnimationHelper';

export function usePatternSharedElementAnimationHelper<
  T extends HTMLElement = HTMLElement,
  P extends object = object,
>(
  pattern: string,
  params: P,
  options?: { styleKeys?: StyleKey[]; options?: AnimationOptions }
) {
  const sharedId = generateFromPattern(pattern, params);

  const [nodeRef, helper] = useDOMAnimationHelper(
    animationHelper,
    sharedId,
    options
  );

  const makeSnapshot = useCallback(() => {
    animationHelper.clearSnapshots(pattern);
    helper.makeSnapshot();
  }, [pattern, helper.makeSnapshot]);

  return [
    nodeRef as React.MutableRefObject<T | null>,
    { ...helper, makeSnapshot },
  ] as const;
}
