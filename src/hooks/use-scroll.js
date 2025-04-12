import { useRef } from 'react';

export const useScroll = () => {

  const myRef = useRef();

  const scrollToStart = (el) => {
    el.scrollIntoView({ behavior: 'smooth' });
  };

  return { myRef, scrollToStart }
}
