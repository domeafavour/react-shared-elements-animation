import { usePhotosQuery } from '@/hooks/usePhotosQuery';
import { PhotoItem } from './components/PhotoItem';

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
      {data.map((photo) => (
        <PhotoItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
