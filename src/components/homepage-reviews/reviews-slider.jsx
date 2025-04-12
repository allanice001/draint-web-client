import Button, { IconPlacement } from '../shared/button/button';
import { List, Record } from 'components/shared/list';
import React, { useEffect, useRef, useState } from 'react';
import ArrowRight from '../icons/arrow-right';
import { Container } from 'components/shared/container/container';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './review-slider.module.scss';
import { useSlider } from 'hooks/use-slider';
import useTheme from 'hooks/use-theme';

export const ReviewSlider = props => {
  const {
    Model,
    list = [],
    link = {},
    item = () => null,
    loading,
    limitOnDesktop = 1,
  } = props;

  const { isDesktop, isTablet } = useTheme();

  const [slides, setSlides] = useState([]);
  const [limit, setLimit] = useState(limitOnDesktop);

  const itemRef = useRef();

  const {
    prevSlide,
    nextSlide,
    setActiveSlide,
    activeSlide,
    styles: sliderStyles,
    getSlideStyles,
  } = useSlider(slides.length, false, itemRef);

  useEffect(() => {
    setLimit(isDesktop ? limitOnDesktop : limit);
  }, [limitOnDesktop, isDesktop, limit]);

  useEffect(() => {
    let data;
    let count = 0;
    const result = [];

    data = loading ? Array.from(new Array(limit)) : list.map(Model.create);

    while (count < data.length) {
      result.push(list.slice(count, count + limit));
      count += limit;
    }

    setSlides(result);
  }, [loading, list, isDesktop, isTablet, limit, Model]);

  return (
    <section className={styles.root}>
      <List horizontal className={styles.buttons}>
        <Record>
          <Button
            disabled={activeSlide === 0}
            className={styles.button}
            iconPlacement={IconPlacement.Left}
            icon={<ArrowRight className={cx(styles.icon, styles.reverse)} />}
            onClick={prevSlide}
          />
        </Record>

        <Record>
          <Button
            disabled={activeSlide === slides.length - 1}
            className={styles.button}
            iconPlacement={IconPlacement.Left}
            icon={<ArrowRight className={styles.icon} />}
            onClick={nextSlide}
          />
        </Record>
      </List>

      {slides.length > 1 && (
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
      )}

      <Container className={cx(styles.content, sliderStyles.root)}>
        {link.text && (
          <Link className={styles.link} to={link.href}>
            {link.text}
          </Link>
        )}

        <div className={cx(styles.slides, sliderStyles.slides)}>
          {slides.map((slide, index) => (
            <div
              ref={itemRef}
              key={index}
              className={cx(styles.slide, sliderStyles.slide)}
              style={getSlideStyles(index)}
            >
              {slide.map((data, i) => item(data, i))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
