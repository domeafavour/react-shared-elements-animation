import {
  BaseAnimationHelper,
  UseAnimationHelperOptions,
  createSharedDOMElementNode,
} from '@shared-elements-animation/core';
import { useCallback, useRef, useState } from 'react';
import { useLatestRef } from './useLatestRef';

export function useDOMAnimationHelper<
  H extends BaseAnimationHelper<any>,
  T extends HTMLElement = HTMLElement,
>(animationHelper: H, sharedId: string, options?: UseAnimationHelperOptions) {
  const nodeRef = useRef<T | null>(null);

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

  return [nodeRef, { hasSnapshot, fromSnapshot, makeSnapshot }] as const;
}
