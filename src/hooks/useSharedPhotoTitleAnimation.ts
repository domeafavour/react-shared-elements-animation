import { useDynamicSharedElementAnimationHelper } from '@/components/SharedElements';
import { useLayoutEffect } from 'react';

export function useSharedPhotoTitleAnimation(photoId: number | string) {
  const [nodeRef, helper] =
    useDynamicSharedElementAnimationHelper<HTMLDivElement>(
      'title/:id',
      { id: photoId },
      { styleKeys: ['color', 'fontSize', 'fontWeight'] }
    );

  useLayoutEffect(() => {
    helper.enter();
  }, [photoId]);

  return [nodeRef, helper] as const;
}
