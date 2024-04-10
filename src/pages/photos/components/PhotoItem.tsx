import { PhotoItemTitle } from '@/components/PhotoItemTitle';
import { Photo } from '@/hooks/usePhotosQuery';
import { useSharedPhotoImageAnimation } from '@/hooks/useSharedPhotoImageAnimation';
import { useSharedPhotoTitleAnimation } from '@/hooks/useSharedPhotoTitleAnimation';
import { Link } from 'umi';

export function PhotoItem({ photo }: { photo: Photo }) {
  const titleRef = useSharedPhotoTitleAnimation(photo.id);
  const imageRef = useSharedPhotoImageAnimation(photo.id);

  return (
    <div className="border border-solid border-gray-400 rounded-md size-52">
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
