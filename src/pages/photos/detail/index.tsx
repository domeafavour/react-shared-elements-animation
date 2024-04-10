import { PhotoTitleSharedElement } from '@/components/PhotoTitleSharedElement';
import { SharedRect } from '@/components/SharedElements';
import { usePhotoQuery } from '@/hooks/usePhotosQuery';
import { useParams } from 'umi';

export default function PhotoDetail() {
  const { id } = useParams<{ id: string }>();
  const { data } = usePhotoQuery(id!);

  if (!data) {
    return null;
  }

  return (
    <div>
      <PhotoTitleSharedElement photoId={id!}>
        {({ ref }) => {
          return (
            <h1
              ref={ref}
              className="text-center text-3xl font-bold text-gray-900"
            >
              {data.title}
            </h1>
          );
        }}
      </PhotoTitleSharedElement>
      <SharedRect<HTMLImageElement> sharedId={`photo${id}`}>
        {({ ref }) => {
          return (
            <img
              ref={ref}
              className="m-auto w-60 h-60"
              src={data.thumbnailUrl}
              alt={data.title}
            />
          );
        }}
      </SharedRect>
    </div>
  );
}
