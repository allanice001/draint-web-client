import { List, Record } from 'components/shared/list';
import React, { useEffect, useRef, useState } from 'react';
import Button from 'components/shared/button/button';
import { Container } from 'components/shared/container/container';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './blog-slider.module.scss';
import { useSlider } from 'hooks/use-slider';
import useTheme from 'hooks/use-theme';

export const BlogPostSlider = props => {
  const {
    Model,
    list = [],
    link = {},
    item = (data, i) => null,
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
      <Container className={cx(styles.content, sliderStyles.root)}>
        {link.text && (
          <Link className={styles.link} to={link.href}>
            {link.text}
          </Link>
        )}

        <div className={cx(styles.slides, sliderStyles.blog)}>
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
      <List horizontal className={styles.buttons}>
        <Record>
          <Button
            disabled={activeSlide === 0}
            className={cx(styles.button)}
            onClick={prevSlide}
          >
            Prev
          </Button>
        </Record>

        <Record>
          <Button
            disabled={activeSlide === slides.length - 1}
            className={cx(styles.button)}
            onClick={nextSlide}
          >
            Next
          </Button>
        </Record>
      </List>
    </section>
  );
};
