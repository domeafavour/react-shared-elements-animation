import { SharedNodeRect, StyleKey, StyleObject } from './typings';

export function getDOMStyleObject<T extends HTMLElement>(
  domNode: T,
  styleKeys?: StyleKey[]
): StyleObject {
  const computedStyle = getComputedStyle(domNode);
  if (!styleKeys) {
    return computedStyle as any;
  }

  return styleKeys.reduce((styleObject, styleKey) => {
    (styleObject as Record<string, string>)[styleKey] = computedStyle[
      styleKey as keyof CSSStyleDeclaration
    ] as string;
    return styleObject;
  }, {});
}

export function getDOMSharedNodeRect<T extends HTMLElement>(
  domNode: T
): SharedNodeRect {
  const { left, top, width, height } = domNode.getBoundingClientRect();
  return { left, top, width, height };
}
