import { combine } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

export const useSettings = createWithEqualityFn(
  combine({ dark: false }, (set) => ({
    toggleDark: () => {
      set((state) => ({ dark: !state.dark }));
    },
  }))
);
