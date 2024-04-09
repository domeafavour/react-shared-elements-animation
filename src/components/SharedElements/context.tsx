import React from 'react';
import { createStore, useStore } from 'zustand';
import { combine } from 'zustand/middleware';

function createProvider() {
  const store = createStore(
    combine({ rects: {} as Record<string, DOMRect> }, (set, get) => ({
      setRect: (id: string, rect: DOMRect) =>
        set({ rects: { ...get().rects, [id]: rect } }),
      getRect: (id: string): DOMRect | null => get().rects[id] ?? null,
    }))
  );

  // useless
  function Provider({ children }: React.PropsWithChildren) {
    return <>{children}</>;
  }

  function useStoreSelector<T>(
    selector: (state: ReturnType<(typeof store)['getState']>) => T
  ) {
    return useStore(store, selector);
  }

  return { Provider, useStoreSelector };
}

export const { Provider, useStoreSelector } = createProvider();
