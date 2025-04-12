import { useEffect, useRef } from 'react';

function usePrevious(value) {
  const reference = useRef();

  useEffect(() => {
    reference.current = value;
  }, [value]);

  return reference.current;
}

export default usePrevious;
