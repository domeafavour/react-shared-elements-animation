import { useCallback, useRef, useState } from 'react';
import { PatternSharedElementAnimationHelper } from './AnimationHelper';
import { AnimationOptions, StyleKey } from './typings';
import { useLatestRef } from './useLatestRef';
import { createSharedDOMElementNode } from './useSharedElementAnimation';

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
  const nodeRef = useRef<T | null>(null);
  const sharedId = animationHelper.generateSharedId(params);

  const [hasSnapshot] = useState(() => animationHelper.hasSnapshot(sharedId));

  const latestOptionsRef = useLatestRef(options);
  const latestCreateSharedNodeRef = useLatestRef(() =>
    createSharedDOMElementNode(nodeRef.current, options?.styleKeys)
  );

  const fromSnapshot = useCallback(() => {
    animationHelper.fromSnapshot(
      latestCreateSharedNodeRef.current(),
      sharedId,
      latestOptionsRef.current?.options
    );
  }, [sharedId]);

  const makeSnapshot = useCallback(() => {
    animationHelper.makeSnapshot(latestCreateSharedNodeRef.current(), sharedId);
  }, [sharedId]);

  return [nodeRef, { fromSnapshot, makeSnapshot, hasSnapshot }] as const;
}
