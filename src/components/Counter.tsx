import { useState } from 'react';

export function useCounter(initialCount = 0) {
  const [count, setCount] = useState(initialCount);
  function increment() {
    setCount((previous) => previous + 1);
  }
  return [count, { increment }] as const;
}

export function Counter({ initialCount = 0 }: { initialCount?: number }) {
  const [count, { increment }] = useCounter(initialCount);
  return (
    <button type="button" onClick={increment}>
      {count}
    </button>
  );
}
