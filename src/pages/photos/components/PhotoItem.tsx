import { PhotoItemTitle } from '@/components/PhotoItemTitle';
import { Photo } from '@/hooks/usePhotosQuery';
import { useSharedPhotoImageAnimation } from '@/hooks/useSharedPhotoImageAnimation';
import { useSharedPhotoTitleAnimation } from '@/hooks/useSharedPhotoTitleAnimation';
import { twMerge } from 'tailwind-merge';
import { Link } from 'umi';

export function PhotoItem({ photo }: { photo: Photo }) {
  const [titleRef, titleHelper] = useSharedPhotoTitleAnimation(photo.id);
  const [imageRef, imageHelper] = useSharedPhotoImageAnimation<HTMLDivElement>(
    photo.id
  );

  // If the image or title has no shared element animation, we should fade in the photo item.
  const shouldFadeIn = !imageHelper.hasAnimation || !titleHelper.hasAnimation;

  return (
    <div
      className={twMerge(
        'border border-solid border-gray-400',
        'rounded-md size-52',
        shouldFadeIn && 'animate-in fade-in-25 duration-500'
      )}
      onClick={() => {
        // Trigger leave manually.
        titleHelper.leave();
        imageHelper.leave();
      }}
    >
      <Link to={`/photos/${photo.id}`} className="flex flex-col gap-2">
        <PhotoItemTitle ref={titleRef}>{photo.title}</PhotoItemTitle>
        <div className="size-36 overflow-visible m-auto">
          <div
            ref={imageRef}
            className="size-36 bg-center bg-cover"
            style={{
              backgroundImage: `url(${photo.thumbnailUrl})`,
            }}
          />
        </div>
      </Link>
    </div>
  );
}
