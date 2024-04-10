import { useSharedPhotoTitleAnimation } from '@/hooks/useSharedPhotoTitleAnimation';
import { SharedElementProps } from './SharedElements';

interface Props {
  photoId: string | number;
  children: SharedElementProps<HTMLHeadingElement>['children'];
}

export function PhotoTitleSharedElement({ children, photoId }: Props) {
  return children({ ref: useSharedPhotoTitleAnimation(photoId) });
}
