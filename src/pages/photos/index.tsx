import { PhotoTitleSharedElement } from '@/components/PhotoTitleSharedElement';
import { SharedRect } from '@/components/SharedElements';
import { usePhotosQuery } from '@/hooks/usePhotosQuery';
import { Link } from 'umi';

export default function PhotosPage() {
  const { isLoading, data } = usePhotosQuery();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex flex-row flex-wrap gap-4">
      {data.map((photo) => {
        return (
          <div
            key={photo.id}
            className="border border-solid border-gray-400 rounded-md w-96"
          >
            <Link to={`/photos/${photo.id}`} className="overflow-hidden">
              <PhotoTitleSharedElement photoId={photo.id}>
                {({ ref }) => (
                  <h6
                    ref={ref}
                    className="whitespace-break-spaces text-lg font-normal text-gray-700"
                  >
                    {photo.title}
                  </h6>
                )}
              </PhotoTitleSharedElement>
              <div className="size-32 m-auto">
                <SharedRect<HTMLImageElement> sharedId={`photo${photo.id}`}>
                  {({ ref }) => (
                    <img
                      ref={ref}
                      src={photo.thumbnailUrl}
                      alt={photo.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </SharedRect>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
