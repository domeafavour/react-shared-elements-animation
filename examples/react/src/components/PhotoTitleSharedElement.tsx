import { useSharedPhotoTitleAnimation } from '@/hooks/useSharedPhotoTitleAnimation';
import { SharedElementProps } from '@shared-elements-animation/react';

interface Props {
  photoId: string | number;
  children: SharedElementProps<HTMLHeadingElement>['children'];
}

export function PhotoTitleSharedElement({ children, photoId }: Props) {
  return children({ ref: useSharedPhotoTitleAnimation(photoId)[0] });
}
