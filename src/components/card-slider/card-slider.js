import Button, {
  Secondary as ButtonSecondary,
  IconPlacement,
} from 'components/shared/button/button';
import { List, Record } from 'components/shared/list';
import React, { useCallback, useEffect, useState } from 'react';

import ArrowIcon from 'components/icons/arrow';
import { Container } from 'components/shared/container/container';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './card-slider.module.scss';
import { useSlider } from 'hooks/use-slider';
import useTheme from 'hooks/use-theme';

const ONE_SLIDE = 1;

export const CardSlider = props => {
  const {
    title,
    subtitle,
    Model,
    list = [],
    link = {},
    item = () => null,
    loading,
    isFeature,
    withHistory = false,
    limitOnDesktop = 4,
  } = props;

  const { isDesktop, isTablet } = useTheme();

  const [slides, setSlides] = useState([]);
  const [limit, setLimit] = useState(isTablet ? 4 : limitOnDesktop);
  const [lastSlide, setLastSlide] = useState(0);

  const {
    prevSlide,
    nextSlide,
    activeSlide,
    setActiveSlide,
    styles: sliderStyles,
    getSlideStyles,
    changeSlideHeight,
  } = useSlider(slides.length);

  useEffect(() => {
    setLimit(isTablet ? 4 : limit);
  }, [isTablet, limit]);

  useEffect(() => {
    setLimit(isDesktop ? limitOnDesktop : limit);
  }, [limitOnDesktop, isDesktop, limit]);

  useEffect(() => {
    let data;
    let count = 0;
    const result = [];

    if (isDesktop) {
      data = loading ? Array.from(new Array(limit)) : list.map(Model.create);
    } else {
      data = loading
        ? Array.from(new Array(limit))
        : list.slice(0, lastSlide + limit).map(Model.create);
    }

    while (count < data.length) {
      result.push(data.slice(count, count + limit));
      count += limit;
    }

    setSlides(result);
  }, [loading, list, isDesktop, isTablet, lastSlide, limit, Model]);

  const onShowMore = useCallback(() => {
    setLastSlide(lastSlide + limit);
  }, [lastSlide, limit]);

  return (
    <section className={styles.root}>
      <Container
        className={cx(styles.content, {
          [sliderStyles.root]: isDesktop,
        })}
      >
        <div className={styles.header}>
          <h2 className={cx('group-title', styles.title)}>{title}</h2>

          {subtitle && (
            <p className={cx('group-subtitle', styles.subtitle)}>{subtitle}</p>
          )}

          <List horizontal className={styles.buttons}>
            <Record>
              <Button
                disabled={activeSlide === 0}
                className={cx(styles.button)}
                iconPlacement={IconPlacement.Left}
                icon={<ArrowIcon className={cx(styles.icon, styles.reverse)} />}
                onClick={prevSlide}
              />
            </Record>

            <Record>
              <Button
                disabled={activeSlide === slides.length - 1}
                className={cx(styles.button)}
                iconPlacement={IconPlacement.Left}
                icon={<ArrowIcon className={styles.icon} />}
                onClick={nextSlide}
              />
            </Record>
          </List>
        </div>

        {link.text && (
          <Link className={styles.link} to={link.href}>
            {link.text}
          </Link>
        )}

        <div
          className={cx(styles.slides, {
            [sliderStyles.slides]: isDesktop,
            [styles.withHistory]: withHistory,
            [sliderStyles.feature]: isDesktop && isFeature,
          })}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={cx(styles.slide, {
                [sliderStyles.slide]: isDesktop,
              })}
              style={isDesktop ? getSlideStyles(index) : {}}
            >
              {slide.map((data, i) => item(data, i, changeSlideHeight))}
            </div>
          ))}
        </div>

        {slides.length > ONE_SLIDE && (
          <List horizontal className={styles.dots}>
            {slides.map((slide, index) => {
              return (
                <Record key={index}>
                  <button
                    type="button"
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
        )}

        {lastSlide + limit < list.length && (
          <ButtonSecondary className={styles.more} onClick={onShowMore}>
            Show more
          </ButtonSecondary>
        )}
      </Container>
    </section>
  );
};
