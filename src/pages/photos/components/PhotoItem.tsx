import { useSharedPhotoImageAnimation } from '@/hooks/useSharedPhotoImageAnimation';
import { useSharedPhotoTitleAnimation } from '@/hooks/useSharedPhotoTitleAnimation';
import { Photo } from '@/hooks/usePhotosQuery';
import { Link } from 'umi';

export function PhotoItem({ photo }: { photo: Photo }) {
  const titleRef = useSharedPhotoTitleAnimation(photo.id);
  const imageRef = useSharedPhotoImageAnimation(photo.id);

  return (
    <div className="border border-solid border-gray-400 rounded-md w-96">
      <Link to={`/photos/${photo.id}`} className="overflow-hidden">
        <h6
          ref={titleRef}
          className="whitespace-break-spaces text-center text-lg font-normal text-gray-700"
        >
          {photo.title}
        </h6>
        <div className="size-32 m-auto">
          <img
            ref={imageRef}
            src={photo.thumbnailUrl}
            alt={photo.title}
            className="w-full h-full object-contain"
          />
        </div>
      </Link>
    </div>
  );
}
