import { useEffect, useState } from 'react';

export const useWindowSize = windowParams => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const isMobile = windowSize.width < windowParams.width;

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};
