import { useCallback, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    overflowX: 'hidden',
    position: 'relative',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
  },

  slides: ({ dataStyles }) => {
    return {
      position: 'relative',
      height: '100%',
      transition: 'transform 0.4s ease-out',
      transform: `translateX(-${100 * dataStyles.activeSlide}%)`,
      willChange: 'transform',
    };
  },

  feature: ({ dataStyles }) => {
    return {
      position: 'relative',
      marginBottom: 150,
      height: dataStyles.slideHeight,
      transition: 'transform 0.4s ease-out',
      transform: `translateX(-${100 * dataStyles.activeSlide}%)`,
      willChange: 'transform',
    };
  },

  blog: ({ dataStyles }) => {
    return {
      position: 'relative',
      height: '100%',
      transition: 'transform 0.4s ease-out',
      transform: `translateX(-${dataStyles.slideWidth *
        dataStyles.activeSlide}px)`,
      willChange: 'transform',
    };
  },

  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

let maxHeight = 0;

export const useSlider = (slides = 0, automatic, ref) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideHeight, setSlideHeight] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  const classes = useStyles({
    dataStyles: {
      activeSlide,
      slideHeight,
      slideWidth,
    },
  });

  useEffect(() => {
    maxHeight = 0;
  }, []);

  const prevSlide = useCallback(() => {
    const nextSlide = activeSlide - 1;
    setActiveSlide(nextSlide > 0 ? 0 : nextSlide);
  }, [activeSlide]);

  const nextSlide = useCallback(() => {
    const nextSlide = activeSlide + 1;
    setActiveSlide(nextSlide > slides - 1 ? 0 : nextSlide);
    setSlideWidth(ref?.current?.offsetWidth);
  }, [activeSlide, ref, slides]);

  const changeSlideHeight = height => {
    if (height > maxHeight) {
      maxHeight = height;
      setSlideHeight(maxHeight + 120);
    }
  };

  useEffect(() => {
    let timeoutId;

    if (automatic) {
      timeoutId = setTimeout(() => {
        nextSlide();
      }, 6000);

      return () => clearTimeout(timeoutId);
    }
  }, [activeSlide, nextSlide, automatic]);

  return {
    activeSlide,
    prevSlide,
    nextSlide,
    changeSlideHeight,
    slideHeight,
    setActiveSlide,
    styles: classes,
    getSlideStyles: position => {
      return {
        transform: `translateX(${position * 100}%)`,
      };
    },
  };
};
