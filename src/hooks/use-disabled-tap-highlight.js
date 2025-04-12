import { useEffect } from 'react';

export function useDisabledTapHighLight() {
  const eventHandler = () => {}

  useEffect(() => {
    document.addEventListener("touchstart", eventHandler, true);

    return () => document.removeEventListener('touchstart', eventHandler, true);
  }, [])
}
