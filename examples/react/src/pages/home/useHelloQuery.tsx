import { useQuery } from '@tanstack/react-query';

export function useHelloQuery() {
  return useQuery({
    queryKey: ['home'],
    queryFn: () => {
      console.log('fetching data...');
      return new Promise<string>((resolve) => {
        setTimeout(() => resolve('hello'), 500);
      });
    },
  });
}
