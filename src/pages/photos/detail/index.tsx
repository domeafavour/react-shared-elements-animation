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
    <div>
      <h1
        ref={titleRef}
        className="text-center text-3xl font-bold text-gray-900"
      >
        {data.title}
      </h1>
      <img
        ref={imageRef}
        className="m-auto w-60 h-60"
        src={data.thumbnailUrl}
        alt={data.title}
      />
    </div>
  );
}
