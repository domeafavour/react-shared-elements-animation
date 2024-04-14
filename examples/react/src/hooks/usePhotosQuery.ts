import { useQuery, useQueryClient } from '@tanstack/react-query';

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export function usePhotosQuery() {
  return useQuery({
    queryKey: ['photos'],
    queryFn: async () => {
      const resp = await fetch(
        'https://jsonplaceholder.typicode.com/photos?_page=1&_limit=50'
      );
      const json = await resp.json();
      return json as Photo[];
    },
  });
}

export function usePhotoQuery(id: string) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['photo', id],
    placeholderData: () => {
      const photos = queryClient.getQueryData<Photo[]>(['photos']);
      return photos?.find((p) => p.id === +id);
    },
    queryFn: async () => {
      const resp = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${id}`
      );
      const json = await resp.json();
      return json as Photo;
    },
  });
}
