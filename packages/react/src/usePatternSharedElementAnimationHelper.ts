import {
  AnimationOptions,
  StyleKey,
  generateFromPattern,
} from '@shared-elements-animation/core';
import { useCallback } from 'react';
import { sharedElementAnimationHelper } from './sharedElementAnimationHelper';
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
    sharedElementAnimationHelper,
    sharedId,
    options
  );

  const makeSnapshot = useCallback(() => {
    sharedElementAnimationHelper.clearSnapshots(pattern);
    helper.makeSnapshot();
  }, [pattern, helper.makeSnapshot]);

  return [
    nodeRef as React.MutableRefObject<T | null>,
    { ...helper, makeSnapshot },
  ] as const;
}
