import { useEffect, useLayoutEffect, useRef } from 'react';
import { LRUCache } from './LRUCache';
import { defaultKeyframeAnimationOptions } from './constants';
import { StyleKey, StyleObject } from './typings';

const lruCache = new LRUCache<StyleObject>(200);

function getStyle(sharedId: string) {
  return lruCache.get(sharedId) ?? null;
}

function setStyle(sharedId: string, style: StyleObject) {
  lruCache.set(sharedId, style);
}

export function useSharedStyleAnimation<T extends HTMLElement = HTMLElement>(
  sharedId: string,
  styleKeys: StyleKey[] = [],
  options = defaultKeyframeAnimationOptions
) {
  const nodeRef = useRef<T | null>(null);

  function getNodeStyleObject(): StyleObject {
    const node = nodeRef.current;
    if (node) {
      const computedStyle = getComputedStyle(node);

      return styleKeys.length
        ? styleKeys.reduce((styleObject, styleKey) => {
            (styleObject as StyleObject)[styleKey] = computedStyle[
              styleKey as keyof CSSStyleDeclaration
            ] as string;
            return styleObject;
          }, {})
        : computedStyle;
    }
    return {};
  }

  const latestGetNodeStyleObjectRef = useRef(getNodeStyleObject);
  useEffect(() => {
    latestGetNodeStyleObjectRef.current = getNodeStyleObject;
  });

  useEffect(() => {
    const node = nodeRef.current;
    const previousStyle = getStyle(sharedId);
    if (previousStyle && node) {
      const currentStyle = latestGetNodeStyleObjectRef.current();
      node.animate(
        [previousStyle as Keyframe, currentStyle as Keyframe],
        options
      );
    }
  }, [sharedId]);

  useLayoutEffect(
    () => () => {
      const node = nodeRef.current;
      if (node) {
        setStyle(sharedId, latestGetNodeStyleObjectRef.current());
      }
    },
    [sharedId]
  );

  return [nodeRef] as const;
}
