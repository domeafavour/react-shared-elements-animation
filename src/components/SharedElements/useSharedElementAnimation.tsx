import { useRef } from 'react';
import { sharedElementAnimationHelper } from './AnimationHelper';
import { SharedDOMElementNode } from './SharedNode';
import { defaultKeyframeAnimationOptions } from './constants';
import { AnimationOptions, StyleKey } from './typings';
import { useFromSnapshotEffect } from './useFromSnapshotEffect';
import { useLatestRef } from './useLatestRef';
import { useMakeSnapshotEffect } from './useMakeSnapshotEffect';

export function createSharedDOMElementNode<T extends HTMLElement>(
  domNode: T | null,
  styleKeys?: StyleKey[]
) {
  return domNode ? new SharedDOMElementNode(domNode, styleKeys) : null;
}
export function useSharedElementAnimation<T extends HTMLElement = HTMLElement>(
  sharedId: string,
  options?: { styleKeys?: StyleKey[]; options?: AnimationOptions }
) {
  const {
    styleKeys,
    options: animationOptions = defaultKeyframeAnimationOptions,
  } = options ?? {};
  const nodeRef = useRef<T | null>(null);

  const latestAnimationOptionsRef = useLatestRef(animationOptions);
  const latestGetSharedNodeRef = useLatestRef(() =>
    createSharedDOMElementNode(nodeRef.current, styleKeys)
  );

  useFromSnapshotEffect(() => {
    sharedElementAnimationHelper.fromSnapshot(
      latestGetSharedNodeRef.current(),
      sharedId,
      latestAnimationOptionsRef.current
    );
  }, [sharedId]);

  useMakeSnapshotEffect(() => {
    sharedElementAnimationHelper.makeSnapshot(
      latestGetSharedNodeRef.current(),
      sharedId
    );
  }, [sharedId]);

  return [nodeRef] as const;
}
