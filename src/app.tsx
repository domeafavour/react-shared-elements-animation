import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      // retry on error
      retry: false,
      retryOnMount: true,
    },
    mutations: {
      retry: false,
    },
  },
});

export function rootContainer(container: JSX.Element) {
  return (
    <QueryClientProvider client={queryClient}>{container}</QueryClientProvider>
  );
}
