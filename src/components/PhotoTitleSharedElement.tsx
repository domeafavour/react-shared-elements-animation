import { useComposedRef } from '@/hooks/useComposedRef';
import {
  SharedElementProps,
  useSharedRectAnimation,
  useSharedStyleAnimation,
} from './SharedElements';

interface Props {
  photoId: string | number;
  children: SharedElementProps<HTMLHeadingElement>['children'];
}

export function PhotoTitleSharedElement({ children, photoId }: Props) {
  const [rectAnimationRef] = useSharedRectAnimation<HTMLHeadingElement>(
    `title${photoId}`
  );

  const [styleAnimationRef] = useSharedStyleAnimation<HTMLHeadingElement>(
    `title${photoId}`,
    ['fontSize', 'fontWeight', 'color']
  );

  const composedRef = useComposedRef(rectAnimationRef, styleAnimationRef);

  return children({ ref: composedRef });
}
