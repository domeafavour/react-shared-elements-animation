import { useCallback, useRef, useState } from 'react';
import { BaseAnimationHelper } from './AnimationHelper';
import { SharedDOMElementNode } from './SharedNode';
import { AnimationOptions, StyleKey } from './typings';
import { useLatestRef } from './useLatestRef';

export function createSharedDOMElementNode<T extends HTMLElement>(
  domNode: T | null,
  styleKeys?: StyleKey[]
) {
  return domNode ? new SharedDOMElementNode(domNode, styleKeys) : null;
}

export function useDOMAnimationHelper<
  H extends BaseAnimationHelper<any>,
  T extends HTMLElement = HTMLElement,
>(
  animationHelper: H,
  sharedId: string,
  options?: { styleKeys?: StyleKey[]; options?: AnimationOptions }
) {
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
