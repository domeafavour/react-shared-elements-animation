import {
  SharedElementProps,
  useSharedElementAnimation,
} from './SharedElements';

interface Props {
  photoId: string | number;
  children: SharedElementProps<HTMLHeadingElement>['children'];
}

export function PhotoTitleSharedElement({ children, photoId }: Props) {
  const composedRef = useSharedElementAnimation<HTMLHeadingElement>(
    `title${photoId}`,
    {
      styleKeys: ['fontSize', 'fontWeight', 'color'],
    }
  );

  return children({ ref: composedRef });
}
