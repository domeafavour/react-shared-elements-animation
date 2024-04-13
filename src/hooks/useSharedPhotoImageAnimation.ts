import { usePatternSharedElementAnimationHelper } from '@/components/SharedElements';

export function useSharedPhotoImageAnimation<T extends HTMLElement>(
  photoId: number | string
) {
  return usePatternSharedElementAnimationHelper<T>(
    'photo/:id',
    { id: photoId },
    { styleKeys: [] }
  );
}
