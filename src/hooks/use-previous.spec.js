import { renderHook } from '@testing-library/react-hooks';
import usePrevious from './use-previous';

describe('usePrevious tests', () => {
  const data = {
    init: 1,
    prev: 1,

    incrementInit() {
      this.prev = this.init;
      this.init += 1;
    },
  };

  it('verifies that it renders with no initial value', () => {
    expect.assertions(1);

    const { result } = renderHook(() => usePrevious());

    expect(result.current).toBeUndefined();
  });

  it('verifies that it renders with initial value', () => {
    expect.assertions(1);

    const { rerender, result } = renderHook(() => usePrevious(data.init));

    data.incrementInit();
    rerender();

    expect(result.current).toBe(data.prev);
  });

  it('verifies that it returns prev value', () => {
    expect.assertions(10);

    const { rerender, result } = renderHook(() => usePrevious(data.init));

    for (let index = 0; index < 10; index += 1) {
      data.incrementInit();
      rerender();

      expect(result.current).toBe(data.prev);
    }
  });
});
