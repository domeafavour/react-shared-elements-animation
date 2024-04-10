export interface SharedElementProps<T extends HTMLElement = HTMLElement> {
  sharedId: string;
  children: (props: {
    ref: React.MutableRefObject<T | null>;
  }) => React.ReactNode;
}

export type SharedElementType = <T extends HTMLElement = HTMLElement>(
  props: SharedElementProps<T>
) => React.ReactNode;

export type StyleObject = Record<string, string>;

export type StyleKey = Exclude<
  keyof CSSStyleDeclaration,
  'getPropertyValue' | 'getPropertyPriority' | symbol
>;
