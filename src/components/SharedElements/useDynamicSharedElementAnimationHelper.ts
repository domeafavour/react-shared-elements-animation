import { useCallback, useEffect, useRef, useState } from 'react';
import { DynamicSharedElementAnimationHelper } from './AnimationHelper';
import { AnimationOptions, StyleKey } from './typings';
import { createSharedDOMElementNode } from './useSharedElementAnimation';

const DYNAMIC_HELPERS = new Map<string, DynamicSharedElementAnimationHelper>();

function ensureAnimationHelper<P extends object = object>(pattern: string) {
  if (!DYNAMIC_HELPERS.has(pattern)) {
    DYNAMIC_HELPERS.set(
      pattern,
      new DynamicSharedElementAnimationHelper<P>(pattern)
    );
  }
  return DYNAMIC_HELPERS.get(
    pattern
  )! as DynamicSharedElementAnimationHelper<P>;
}

export function useDynamicSharedElementAnimationHelper<
  T extends HTMLElement = HTMLElement,
  P extends object = object
>(
  pattern: string,
  params: P,
  options?: { styleKeys?: StyleKey[]; options?: AnimationOptions }
) {
  const animationHelper = ensureAnimationHelper<P>(pattern);
  const nodeRef = useRef<T | null>(null);
  const sharedId = animationHelper.resolveSharedId(params);

  const [hasAnimation] = useState(() =>
    animationHelper.hasCache(animationHelper.resolveSharedId(params))
  );

  const latestOptionsRef = useRef(options);
  const latestParamsRef = useRef(params);
  useEffect(() => {
    latestParamsRef.current = params;
    latestOptionsRef.current = options;
  });

  const enter = useCallback(() => {
    const { styleKeys, options: animationOptions } =
      latestOptionsRef.current ?? {};
    const sharedNode = createSharedDOMElementNode(nodeRef.current, styleKeys);
    animationHelper.enter(sharedNode, sharedId, animationOptions);
  }, [sharedId]);

  const leave = useCallback(() => {
    const sharedNode = createSharedDOMElementNode(
      nodeRef.current,
      latestOptionsRef.current?.styleKeys
    );
    animationHelper.exit(sharedNode, sharedId);
  }, [sharedId]);

  return [nodeRef, { enter, leave, hasAnimation }] as const;
}
