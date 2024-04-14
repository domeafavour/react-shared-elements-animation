import { PatternSharedElementAnimationHelper } from './AnimationHelper';
import { AnimationOptions, StyleKey } from './typings';
import { useDOMAnimationHelper } from './useAnimationHelper';

const DYNAMIC_HELPERS = new Map<string, PatternSharedElementAnimationHelper>();

function ensureAnimationHelper<P extends object = object>(pattern: string) {
  if (!DYNAMIC_HELPERS.has(pattern)) {
    DYNAMIC_HELPERS.set(
      pattern,
      new PatternSharedElementAnimationHelper<P>(pattern)
    );
  }
  return DYNAMIC_HELPERS.get(
    pattern
  )! as PatternSharedElementAnimationHelper<P>;
}

export function usePatternSharedElementAnimationHelper<
  T extends HTMLElement = HTMLElement,
  P extends object = object,
>(
  pattern: string,
  params: P,
  options?: { styleKeys?: StyleKey[]; options?: AnimationOptions }
) {
  const animationHelper = ensureAnimationHelper<P>(pattern);
  const sharedId = animationHelper.generateSharedId(params);

  return useDOMAnimationHelper<PatternSharedElementAnimationHelper<P>, T>(
    animationHelper,
    sharedId,
    options
  );
}
