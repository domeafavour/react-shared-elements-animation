import { usePatternSharedElementAnimationHelper } from '@shared-elements-animation/react';

export function useSharedPhotoTitleAnimation(photoId: number | string) {
  return usePatternSharedElementAnimationHelper<HTMLDivElement>(
    'title/:id',
    { id: photoId },
    { styleKeys: ['color', 'fontSize', 'fontWeight'] }
  );
}
