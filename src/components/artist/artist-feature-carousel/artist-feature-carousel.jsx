import React, { useEffect, useState } from 'react';

import { ARTIST_SIGN_UP } from '../../../constants/links';
import Icons from '../../icons';
import JoinUsButton from '../../join-us/join-us-button';
import classnames from 'classnames';
import staticUrls from 'constants/images/static-urls';
import styles from './artist-feature-carousel.module.scss';

const slides = {
  1: {
    bg: staticUrls.screen.searchMap,
    bgf: staticUrls.screen.priceFilter,

    point: {
      x: 10,
      y: 41.15384615384615,
      icon: () => <Icons.Attention />,
    },

    bgfPosition: {
      x: -1.6,
      y: 41.15384615384615,
    },

    lead: 'Advanced Search',
    title: 'Easy to reach for collectors',
    description: `Collectors can use name or interactive map search, search by medium,
      style or price range all in order to get easier to your artwork.`,
  },

  2: {
    bg: staticUrls.screen.artworks,
    bgf: staticUrls.screen.singleArtwork,

    point: {
      x: 37.94871794871795,
      y: -0.9852216748768473,
      icon: () => <Icons.Plus />,
    },

    bgfPosition: {
      x: 38.2905982905983,
      y: -14.285714285714285,
    },

    lead: 'Your all in One Artist Profile',
    title: 'Forget about Website-Builder or expensive galleries',

    description:
      'Customize, sell Artworks, present your Vita, Blogpost, connect Instagram, ship and manage Payouts.',
  },

  3: {
    bg: staticUrls.screen.artistProfile,
    bgf: staticUrls.screen.myStudio,

    point: {
      x: 39.31623931623932,
      y: -0.9852216748768473,
      icon: () => <Icons.Plus />,
    },

    bgfPosition: {
      x: 39.65811965811966,
      y: -16.00985221674877,
    },

    lead: 'About section',
    title: 'Tell your story. Build your Brand',

    description:
      'Write your biography, add blogs and present yourself. Create a personal artist brand',
  },

  4: {
    bg: staticUrls.screen.contact,
    bgf: staticUrls.screen.newArtworks,

    point: {
      x: 55.55555555555556,
      y: 62.06896551724138,
      icon: () => <Icons.Send />,
    },

    bgfPosition: {
      x: 29.059829059829063,
      y: 39.40886699507389,
    },

    lead: 'Manage Customer Generation',
    title: 'Build your Customer base',

    description:
      'Create contacts, send In-Profile Mails about new artworks, recently sold or soon up for sale.',
  },

  5: {
    bg: staticUrls.screen.salesDashboard,
    bgf: staticUrls.screen.paymentModal,

    point: {
      x: 46.15384615384615,
      y: 0,
      icon: () => <Icons.Attention />,
    },

    bgfPosition: {
      x: 46.15384615384615,
      y: -14.039408866995073,
    },

    lead: 'Sales dashboard',
    title: 'Easy payment & shippments',
    description: `We got you covered. Get paid safe & secure, manage payout and show shipping
      costs exactly from your doorstop, into the world.`,
  },
};

function Laptop({ slide = 1, withMobile }) {
  const [activeSlide, setActiveSlide] = useState(slide);

  useEffect(() => {
    const id = setTimeout(() => {
      setActiveSlide(slide);
    }, 200);

    return () => {
      clearTimeout(id);
    };
  }, [slide]);

  return (
    <div
      className={`${styles.laptop} ${withMobile && styles.mobile_show}`}
      style={{ backgroundImage: `url(${staticUrls.screen.laptop})` }}
    >
      {slide === activeSlide && (
        <img
          alt={slides[activeSlide].lead}
          className={styles.view}
          src={slides[activeSlide].bg}
          title={slides[activeSlide].lead}
        />
      )}
      <button
        type="button"
        className={styles.button}
        style={{
          left: `${slides[activeSlide].point.x}%`,
          top: `${slides[activeSlide].point.y}%`,
        }}
      >
        {slides[activeSlide].point.icon()}
      </button>
      {slide === activeSlide && (
        <img
          alt={slides[activeSlide].lead}
          className={styles.view__feature}
          src={slides[activeSlide].bgf}
          style={{
            top: `${slides[activeSlide].bgfPosition.y}%`,
            left: `${slides[activeSlide].bgfPosition.x}%`,
          }}
          title={slides[activeSlide].lead}
        />
      )}
      <div className={styles.shadow} />
    </div>
  );
}

function Description({ slide = 1 }) {
  const [activeSlide, setActiveSlide] = useState(slide);

  useEffect(() => {
    const id = setTimeout(() => {
      setActiveSlide(slide);
    }, 200);

    return () => {
      clearTimeout(id);
    };
  }, [slide]);

  if (activeSlide !== slide) {
    return <div className={styles.content__backdrop} />;
  }

  return (
    <div className={styles.content}>
      <p className={styles.lead}>{slides[slide].lead}</p>
      <h4 className={styles.title}>{slides[slide].title}</h4>
      <p className={styles.description}>{slides[slide].description}</p>
    </div>
  );
}

function Item({ slide }) {
  return (
    <div className={styles.item__wrapper}>
      {slide && <Laptop slide={slide} />}
      {slide && <Description slide={slide} />}
    </div>
  );
}

export function Carousel({
  vertical = false,
  autoplay = false,
  def_slide = 1,
}) {
  const [slide, setSlide] = useState(def_slide);
  const slidesArr = Object.keys(slides);
  const sliderClasses = classnames(styles.slider, {
    [styles.vertical]: vertical,
  });
  const footerClasses = classnames(styles.footer, {
    [styles.vertical]: vertical,
  });

  useEffect(() => {
    let timeoutId;

    if (autoplay) {
      timeoutId = setTimeout(() => {
        if (slide === slidesArr.length) {
          setSlide(1);
        } else {
          setSlide(slide + 1);
        }
      }, 7000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [autoplay, slide, slidesArr.length]);

  return (
    <>
      <div className={sliderClasses}>
        {!autoplay && (
          <button
            type="button"
            className={`${styles.arrow} ${styles.prev}`}
            disabled={slide === 1}
            onClick={() => {
              if (slide > 1) setSlide(slide - 1);
            }}
          >
            <Icons.Arrow />
          </button>
        )}
        <Item slide={slide} />
        {!autoplay && (
          <button
            type="button"
            className={`${styles.arrow} ${styles.next}`}
            disabled={slide === slidesArr.length}
            onClick={() => {
              if (slide < slidesArr.length) setSlide(slide + 1);
            }}
          >
            <Icons.Arrow />
          </button>
        )}
      </div>

      <div className={footerClasses}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.prev}`}
          disabled={slide === 1}
          onClick={() => {
            if (slide > 1) setSlide(slide - 1);
          }}
        >
          <Icons.Arrow />
        </button>
        {slidesArr.map((slideIndex, i) => (
          <button
            type="button"
            onClick={() => setSlide(i + 1)}
            key={slideIndex}
            className={`${styles.dot} ${
              +slideIndex === slide ? styles.active : ''
            }`}
          />
        ))}
        <button
          type="button"
          className={`${styles.arrow} ${styles.next}`}
          disabled={slide === slidesArr.length}
          onClick={() => {
            if (slide < slidesArr.length) setSlide(slide + 1);
          }}
        >
          <Icons.Arrow />
        </button>
      </div>
    </>
  );
}

export function SingleSlide(props) {
  const { slide = 1, reverse = false, hasPadding } = props;

  const slideClasess = classnames(styles.slider, {
    [styles['slider--with-padding']]: hasPadding,
  });

  return (
    <div className={slideClasess}>
      <div
        className={`${styles.item__wrapper} ${styles.single} ${
          reverse ? styles.reverse : ''
        }`}
      >
        <Laptop slide={slide} withMobile />
        <div
          className={`${styles.content} ${styles.row} ${
            reverse ? styles.reverse : ''
          } `}
        >
          <p className={`${styles.lead} ${reverse ? styles.reverse : ''}`}>
            {slides[slide].lead}
          </p>
          <h4
            className={`${styles.title} ${styles.single} ${
              reverse ? styles.reverse : ''
            }`}
          >
            {slides[slide].title}
          </h4>
          <p
            className={`${styles.description} ${
              reverse ? styles.reverse : ''
            } `}
          >
            {slides[slide].description}
          </p>
        </div>
      </div>
    </div>
  );
}

function ArtistFeatureCarousel() {
  return (
    <section className={styles.wrapper}>
      <div className="container">
        <h3 className={`group-title ${styles.title}`}>
          New features for Artist
        </h3>

        <Carousel />

        <div className={styles.button__wrapper}>
          <JoinUsButton name={'Join as Artist'} url={ARTIST_SIGN_UP} />
        </div>
      </div>
    </section>
  );
}

export default ArtistFeatureCarousel;
