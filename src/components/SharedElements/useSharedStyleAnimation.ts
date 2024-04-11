import { useEffect, useLayoutEffect, useRef } from 'react';
import { sharedStyleAnimationHelper } from './AnimationHelper';
import { SharedDOMStyleNode } from './SharedNode';
import { defaultKeyframeAnimationOptions } from './constants';
import { StyleKey } from './typings';

export function createSharedStyleNode<T extends HTMLElement>(
  domNode: T | null,
  styleKeys?: StyleKey[]
) {
  return domNode ? new SharedDOMStyleNode(domNode, styleKeys) : null;
}

export function useSharedStyleAnimation<T extends HTMLElement = HTMLElement>(
  sharedId: string,
  styleKeys: StyleKey[] = [],
  options = defaultKeyframeAnimationOptions
) {
  const nodeRef = useRef<T | null>(null);

  const optionsRef = useRef(options);
  const styleKeysRef = useRef(styleKeys);
  useEffect(() => {
    optionsRef.current = options;
    styleKeysRef.current = styleKeys;
  });

  useEffect(() => {
    sharedStyleAnimationHelper.enter(
      createSharedStyleNode(nodeRef.current, styleKeysRef.current),
      sharedId
    );
  }, [sharedId]);

  useLayoutEffect(
    () => () => {
      sharedStyleAnimationHelper.exit(
        createSharedStyleNode(nodeRef.current, styleKeysRef.current),
        sharedId
      );
    },
    [sharedId]
  );

  return [nodeRef] as const;
}
