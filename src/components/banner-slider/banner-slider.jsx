import Button, { IconPlacement } from 'components/shared/button/button';
import { List, Record } from 'components/shared/list';

import ArrowIcon from 'components/icons/arrow';
import { Container } from 'components/shared/container/container';
import { Link } from 'react-router-dom';
import React from 'react';
import cx from 'classnames';
import { getAuthorName } from 'services/global';
import { imageSizes } from 'constants/media-query/image-sizes';
import styles from './banner-slider.module.scss';
import { useSlider } from 'hooks/use-slider';

export const BannerSlider = ({ slides }) => {
  const {
    setActiveSlide,
    nextSlide,
    prevSlide,
    activeSlide,
    styles: sliderStyles,
    getSlideStyles,
  } = useSlider(slides.length, true);

  if (!slides.length) return null;

  return (
    <section className={cx(styles.root, sliderStyles.root)}>
      <div className={sliderStyles.slides}>
        {slides.map((slide, index) => {
          return (
            <div
              className={cx(styles.slide, sliderStyles.slide)}
              style={getSlideStyles(index)}
              key={slide.id}
            >
              <Container className={styles.content}>
                <div className={styles.main}>
                  <h2 className={styles.title}>{slide.title}</h2>

                  <Link className={styles.link} to={slide.url}>
                    {slide.button}
                  </Link>
                </div>

                <div className={styles.footer}>
                  <p className={styles.label}>Artwork</p>
                  <p className={styles.name}>
                    <b>{slide.name}</b> by {getAuthorName(slide)}
                  </p>
                </div>
              </Container>

              <img
                className={styles.image}
                srcSet={slide.small_image || slide.primary_image}
                sizes={imageSizes.ADAPTIVE}
                alt=""
              />
            </div>
          );
        })}
      </div>

      {slides.length > 1 && (
        <>
          <List horizontal className={styles.buttons}>
            <Record>
              <Button
                className={cx(styles.button, styles.disabled)}
                iconPlacement={IconPlacement.Left}
                icon={<ArrowIcon className={cx(styles.icon, styles.reverse)} />}
                onClick={prevSlide}
              />
            </Record>

            <Record>
              <Button
                className={cx(styles.button)}
                iconPlacement={IconPlacement.Left}
                icon={<ArrowIcon className={styles.icon} />}
                onClick={nextSlide}
              />
            </Record>
          </List>

          <List horizontal className={styles.dots}>
            {slides.map((slide, index) => {
              return (
                <Record key={index}>
                  <button
                    className={cx(styles.dot, {
                      [styles.active]: index === activeSlide,
                    })}
                    onClick={() => setActiveSlide(index)}
                  >
                    Slide {index + 1}
                  </button>
                </Record>
              );
            })}
          </List>
        </>
      )}
    </section>
  );
};
