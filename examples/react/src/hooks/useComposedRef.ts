import { useMemo } from 'react';

export function composeRefs<T>(...refs: Exclude<React.Ref<T>, null>[]) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export function useComposedRef<T>(...refs: Exclude<React.Ref<T>, null>[]) {
  return useMemo(() => composeRefs<T>(...refs), []);
}
