import { SharedDOMElementNode } from './SharedNode';
import { StyleKey } from './typings';

export function createSharedDOMElementNode<T extends HTMLElement>(
  domNode: T | null,
  styleKeys?: StyleKey[]
) {
  return domNode ? new SharedDOMElementNode(domNode, styleKeys) : null;
}
