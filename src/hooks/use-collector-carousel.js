import React, { useState } from 'react';
// import { Image } from 'react-bootstrap';
import staticUrls from 'constants/images/static-urls';
import styles from 'components/collector/collector-carousel/collector-carousel.module.scss';
import { useSelector } from 'react-redux';

const useCollectorCarousel = () => {
  const isArtist = useSelector(state => state.user.account.is_artist);

  const slides = [
    {
      bg: staticUrls.screen.artworksFaded,
      title: 'Your Sales-Dashboard',

      description:
        'All at hand to trade artworks you own. Buy and resell at a profit. Make art your asset class',
    },

    {
      el: () => <Slide2 />,
      title: 'Grow your Portfolio!',

      description:
        'Define selling prices, secure payments & insured shipping-page. Invest in Art the simple way.',
    },

    {
      bg: staticUrls.screen.priceChart,
      title: 'Resell artworks, Earn Profits',

      description:
        'Invest in artworks on Draint, and resell them within our ecosystem at a profit. Trade to earn.',
    },
  ];

  const [slide, setSlide] = useState(0);

  const handleBack = () => {
    if (slide !== 0) setSlide(slide - 1);
  };

  const handleNext = () => {
    if (slide < slides.length - 1) setSlide(slide + 1);
  };

  const handleSlide = slide => {
    setSlide(slide);
  };

  function Slide2() {
    return (
      <>
        {/*<Image*/}
        {/*  alt="Safe payment & shipment"*/}
        {/*  className={styles.image}*/}
        {/*  srcSet={staticUrls.image.growPortfolio}*/}
        {/*  title="Safe payment & shipment"*/}
        {/*/>*/}
        <h4 className={styles.image__title}>
          Buy paintings & resell them at a profit!
        </h4>
        <p className={styles.image__description}>
          Whenever a painting is re-sold the artist will profit as well. Invest
          in art.
        </p>
      </>
    );
  }

  function Description({ slide }) {
    return (
      <div className={styles.content}>
        <h4 className={styles.title}>{slides[slide].title}</h4>
        <p className={styles.description}>{slides[slide].description}</p>
      </div>
    );
  }

  function Slide({ slide }) {
    const { bg, el } = slides[slide];

    if (bg) {
      return (
        <img
          alt={slides[slide].title}
          className={slide === 2 ? styles.content__image : ''}
          src={slides[slide].bg}
          title={slides[slide].title}
        />
      );
    }

    if (el) {
      return el();
    }

    return null;
  }

  function Item({ slide }) {
    return (
      <div className={styles.item__wrapper}>
        <div className={styles.slide}>
          <Slide slide={slide} />
        </div>
        <Description slide={slide} />
      </div>
    );
  }

  return {
    Item,
    slides,
    slide,
    isArtist,
    handleBack,
    handleNext,
    handleSlide,
  };
};

export default useCollectorCarousel;
