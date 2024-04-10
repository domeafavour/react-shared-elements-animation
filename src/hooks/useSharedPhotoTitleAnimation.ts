import { useSharedElementAnimation } from '@/components/SharedElements';

export function useSharedPhotoTitleAnimation(photoId: number | string) {
  return useSharedElementAnimation<HTMLHeadingElement>(`title${photoId}`, {
    styleKeys: ['fontSize', 'color', 'fontWeight'],
  });
}
