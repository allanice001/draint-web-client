import { COLLECTOR_SIGN_UP } from 'constants/links';
import Icons from 'components/icons';
import JoinUsButton from 'components/join-us/join-us-button';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import clsx from 'classnames';
import styles from './collector-carousel.module.scss';
import useCollectorCarousel from 'hooks/use-collector-carousel';

function CollectorCarousel() {
  const {
    Item,
    slides,
    slide,
    handleBack,
    handleNext,
    handleSlide,
    isArtist,
  } = useCollectorCarousel();

  return (
    <section className={styles.wrapper}>
      <div className="container">
        <div className={styles.slider}>
          <button
            type="button"
            className={clsx(styles.arrow, styles.prev)}
            disabled={slide === 0}
            onClick={handleBack}
          >
            <Icons.Arrow />
          </button>

          <SwipeableViews
            index={slide}
            onChangeIndex={handleSlide}
            enableMouseEvents
          >
            {slides.map((step, index) => (
              <div key={step.label}>
                {Math.abs(slide - index) <= 2 ? <Item slide={slide} /> : null}
              </div>
            ))}
          </SwipeableViews>

          <button
            type="button"
            className={clsx(styles.arrow, styles.next)}
            disabled={slide === slides.length - 1}
            onClick={handleNext}
          >
            <Icons.Arrow />
          </button>

          <div className={styles.shadow} />
        </div>

        <div className={styles.footer}>
          {slides.map((slideIndex, index) => (
            <div
              key={index}
              onClick={() => handleSlide(Number(index))}
              className={clsx(styles.dot, {
                [styles.active]: Number(index) === slide,
              })}
            />
          ))}
        </div>

        {isArtist && (
          <div className={styles.button__wrapper}>
            <JoinUsButton name={'Join as Collector'} url={COLLECTOR_SIGN_UP} />
          </div>
        )}
      </div>
    </section>
  );
}

export default CollectorCarousel;
