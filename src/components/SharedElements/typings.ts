export interface SharedElementProps<T extends HTMLElement = HTMLElement> {
  sharedId: string;
  children: (props: {
    ref: React.MutableRefObject<T | null> | React.RefCallback<T | null>;
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

export type AnimationOptions = KeyframeAnimationOptions;

export type UseAnimationHelperOptions = {
  styleKeys?: StyleKey[];
  options?: AnimationOptions;
};

export type AnimationValue = {
  rect: SharedNodeRect;
  style: StyleObject;
};

export interface SharedNodeRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export type PatternParams<S extends string> = S['length'] extends 0
  ? object
  : S extends `:${infer P}`
    ? { [key in P]: string }
    : S extends `${string}/:${infer P}/${infer R}`
      ? { [key in P]: string } & PatternParams<R>
      : S extends `${string}/:${infer P}`
        ? { [key in P]: string }
        : object;
