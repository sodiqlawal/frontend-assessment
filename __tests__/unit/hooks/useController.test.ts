import useController from '@/hooks/useController';
import { act, renderHook } from '@testing-library/react';

describe('The useController hook', () => {
  it('should set `isOpen` to true if `open` is triggered ', () => {
    const { result } = renderHook(() => useController(), {
      initialProps: {
        isOpen: false,
      },
    });

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('should set `isOpen` to false if `close` is triggered ', () => {
    const { result } = renderHook(() => useController(), {
      initialProps: {
        isOpen: true,
      },
    });

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle isOpen when toggle is called', () => {
    const { result } = renderHook(() => useController(false));

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
