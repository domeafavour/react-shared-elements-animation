import { usePatternSharedElementAnimationHelper } from '@shared-elements-animation/react';

export function useSharedPhotoImageAnimation<T extends HTMLElement>(
  photoId: number | string
) {
  return usePatternSharedElementAnimationHelper<T>(
    'photo/:id',
    { id: photoId },
    { styleKeys: [] }
  );
}
