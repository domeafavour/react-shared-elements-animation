import { useDynamicSharedElementAnimationHelper } from '@/components/SharedElements';
import { useLayoutEffect } from 'react';

export function useSharedPhotoImageAnimation<T extends HTMLElement>(
  photoId: number | string
) {
  const [nodeRef, helper] = useDynamicSharedElementAnimationHelper<T>(
    'photo/:id',
    { id: photoId },
    { styleKeys: [] }
  );

  useLayoutEffect(() => {
    helper.enter();
  }, [photoId]);

  return [nodeRef, helper] as const;
}
