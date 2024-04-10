import { useSharedRectAnimation } from '@/components/SharedElements';

export function useSharedPhotoImageAnimation(photoId: number | string) {
  const [imageRef] = useSharedRectAnimation<HTMLImageElement>(
    `photo${photoId}`
  );
  return [imageRef];
}
