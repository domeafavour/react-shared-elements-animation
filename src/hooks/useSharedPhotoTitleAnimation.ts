import { usePatternSharedElementAnimationHelper } from '@/components/SharedElements';

export function useSharedPhotoTitleAnimation(photoId: number | string) {
  return usePatternSharedElementAnimationHelper<HTMLDivElement>(
    'title/:id',
    { id: photoId },
    { styleKeys: ['color', 'fontSize', 'fontWeight'] }
  );
}
