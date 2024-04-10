export interface SharedElementProps<T extends HTMLElement> {
  sharedId: string;
  children: (props: {
    ref: React.MutableRefObject<T | null>;
  }) => React.ReactNode;
}
