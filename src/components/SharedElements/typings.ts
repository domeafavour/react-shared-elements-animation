export interface SharedElementProps<T extends HTMLElement = HTMLElement> {
  sharedId: string;
  children: (props: {
    ref: React.MutableRefObject<T | null>;
  }) => React.ReactNode;
}

export type SharedElementType = <T extends HTMLElement = HTMLElement>(
  props: SharedElementProps<T>
) => React.ReactNode;
