import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styles from './carousel.module.scss';

const ShowMore = ({
  list = [],
  page,
  pages,
  limit,
  item,
  onPrev,
  onNext,
  scrollToStart,
  arrowTop = '50%',
  className = '',
}) => {
  const rootClass = !className
    ? classnames(styles.show__wrapper, {
        [styles.unfilled]: list.length < limit,
      })
    : '';
  const itemsClasses = classnames(styles.show_items__wrapper, {
    [styles.unfilled]: list.length < limit,
    [styles.wrap]: list.length > 4,
  });

  const showMoreClasses = classnames(styles.button, styles.show_more);
  const backToStartClasses = classnames(styles.button, styles.back_to_start);

  return (
    <div className={rootClass}>
      <div className={className === '' ? itemsClasses : className}>
        {list.map((el, i) => item(el, i))}
      </div>

      <div
        className={
          page > 1
            ? classnames(styles.buttons_center, styles.buttons_wrapper)
            : styles.buttons_wrapper
        }
      >
        {page < pages && (
          <button
            type="button"
            className={showMoreClasses}
            style={{ top: arrowTop }}
            onClick={() => {
              // scrollToStart();
              onNext();
            }}
          >
            Show more
          </button>
        )}
        {page > 1 && (
          <button
            type="button"
            className={backToStartClasses}
            onClick={() => {
              scrollToStart();
              onPrev();
            }}
          >
            Back to start
          </button>
        )}
      </div>
    </div>
  );
};

ShowMore.defaultProps = {
  arrowTop: '50%',
  className: '',
  list: [],
};

ShowMore.propTypes = {
  arrowTop: PropTypes.string,
  className: PropTypes.string,
  item: PropTypes.func.isRequired,
  limit: PropTypes.number,
  list: PropTypes.array,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pages: PropTypes.number,
  scrollToStart: PropTypes.func.isRequired,
};

export { ShowMore };
