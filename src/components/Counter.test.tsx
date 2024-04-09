import { act, render, renderHook } from '@testing-library/react';
import { Counter, useCounter } from './Counter';

describe('useCounter', () => {
  it('should render without crash', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current[0]).toBe(0);
    act(() => {
      result.current[1].increment();
    });
    expect(result.current[0]).toBe(1);
  });
});

describe('Counter', () => {
  it('should render without crash', () => {
    const { container, getByRole, rerender } = render(<Counter />);
    expect(container).toMatchSnapshot();
    act(() => {
      getByRole('button').click();
    });
    rerender(<Counter />);
    expect(getByRole('button').textContent).toBe('1');
  });
});
