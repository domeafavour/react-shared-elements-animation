import {
  useFromSnapshotEffect,
  useMakeSnapshotEffect,
} from '@/components/SharedElements';
import { usePhotoQuery } from '@/hooks/usePhotosQuery';
import { useSharedPhotoImageAnimation } from '@/hooks/useSharedPhotoImageAnimation';
import { useSharedPhotoTitleAnimation } from '@/hooks/useSharedPhotoTitleAnimation';
import { useParams } from 'umi';

export default function PhotoDetail() {
  const { id } = useParams<{ id: string }>();
  const { data } = usePhotoQuery(id!);
  const [titleRef, titleHelper] = useSharedPhotoTitleAnimation(id!);
  const [imageRef, imageHelper] =
    useSharedPhotoImageAnimation<HTMLImageElement>(id!);

  useFromSnapshotEffect(() => {
    titleHelper.fromSnapshot();
    imageHelper.fromSnapshot();
  }, [id]);

  useMakeSnapshotEffect(() => {
    titleHelper.makeSnapshot();
    imageHelper.makeSnapshot();
  }, [id]);

  if (!data) {
    return null;
  }

  return (
    <div className="w-1/2 m-auto">
      <header>
        <h1
          ref={titleRef}
          className="text-center text-3xl font-bold text-gray-900 whitespace-nowrap text-ellipsis max-w-full overflow-hidden mb-3"
        >
          {data.title}
        </h1>
        <img
          ref={imageRef}
          className="m-auto w-full h-60 object-cover object-center"
          src={data.thumbnailUrl}
          alt={data.title}
        />
      </header>
      <div className="mt-4 animate-in fade-in-0 duration-500">
        <p className="mb-3">
          however pleasant steady master bridge herself form carry music born go
          nails map was have cost involved facing stone farther keep driver
          ready himself
        </p>
        <p className="mb-3">
          take poem enter by somehow immediately coffee away dream engine fourth
          dot meant neighborhood black trick across rate use those president
          studying soap such
        </p>
        <p className="mb-3">
          spite flies smile friendly examine within atom offer rhythm excitement
          lion student motor raise entirely baseball so rubber major disappear
          though beyond joy attached
        </p>
      </div>
    </div>
  );
}
