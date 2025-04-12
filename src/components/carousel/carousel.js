import React, { useRef } from 'react';

import Icons from '../icons';
import classnames from 'classnames';
import styles from './carousel.module.scss';

const Carousel = ({
  list = [],
  page,
  pages,
  limit,
  item,
  button = false,
  onPrev,
  onNext,
  arrowTop = '50%',
}) => {
  const ref = useRef();

  const scrolToStart = () => {
    ref.current.scrollTo(0, 0);
  };

  const itemsClasses = classnames(styles.items__wrapper, {
    [styles.unfilled]: list.length < limit,
    [styles.wrap]: list.length > 4,
  });

  return (
    <>
      <div
        className={`${styles.carousel__wrapper} ${
          list.length < limit ? styles.unfilled : ''
        }`}
      >
        {page > 1 && (
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrow__prev}`}
            style={{ top: arrowTop }}
            onClick={() => {
              scrolToStart();
              onPrev();
            }}
          >
            <Icons.Arrow />
          </button>
        )}

        <div ref={ref} className={itemsClasses}>
          {list.map((el, i) => item(el, i))}
        </div>

        {page < pages && (
          <button
            type="button"
            className={styles.arrow}
            onClick={() => {
              scrolToStart();
              onNext();
            }}
            style={{ top: arrowTop }}
          >
            <Icons.Arrow />
          </button>
        )}
      </div>

      <div className={styles.footer}>
        {button}

        {false && (
          <div className={styles.dots}>
            <button className={`${styles.dot} ${styles.active}`} type="button">
              &nbsp;
            </button>
            <button className={styles.dot} type="button">
              &nbsp;
            </button>
            <button className={styles.dot} type="button">
              &nbsp;
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export { Carousel };
