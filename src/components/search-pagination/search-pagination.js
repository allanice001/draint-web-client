import React, { useEffect } from 'react';

import Icons from '../icons';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { pageScroll } from '../../services/pageScroller';
import styles from './search-pagination.module.scss';

function SearchPagination({ pages, currentPage, setPage, className }) {
  useEffect(() => {
    pageScroll();
  }, [currentPage]);

  const pageList = Array.from(Array(pages)).map((el, i) => i + 1);

  const from = currentPage === 1 ? 1 : currentPage - 1;
  let to = currentPage + 1 > pages ? pages : currentPage + 1;

  const getButtonClasses = page =>
    classnames(styles.page, {
      [styles.active]: currentPage === page,
      [styles.dots]: typeof page === 'string',
    });

  if (from - 2 > 0) {
    pageList.splice(1, from - 2, '...');

    const toIndex = pageList.findIndex(el => el === currentPage);
    to = toIndex + 2;
  }

  if (pageList.length - to > 1) {
    pageList.splice(to, pageList.length - to - 1, '...');
  }

  if (pages === 1) {
    return null;
  }

  return (
    <div
      className={classnames(styles.pagination__wrapper, className, {
        [styles.hidden]: !pages,
      })}
    >
      <div className={styles.pages}>
        {pageList.map((el, i) => (
          <button
            key={i}
            type="button"
            className={getButtonClasses(el)}
            onClick={() => {
              if (Number.isInteger(el)) {
                setPage(el);
              }
            }}
          >
            {el}
          </button>
        ))}
      </div>

      {pages > 1 && (
        <div className={styles.buttons}>
          <button
            className={styles.button}
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            <Icons.Arrow className={`${styles.icon} ${styles.prev}`} />
            Prev
          </button>

          <button
            className={styles.button}
            type="button"
            disabled={currentPage === pages}
            onClick={() => setPage(currentPage + 1)}
          >
            Next
            <Icons.Arrow className={styles.icon} />
          </button>
        </div>
      )}
    </div>
  );
}

SearchPagination.defaultProps = {
  pages: 1,
  currentPage: 1,
};

SearchPagination.propTypes = {
  className: PropTypes.string,
  currentPage: PropTypes.number,
  pages: PropTypes.number,
  setPage: PropTypes.func.isRequired,
};

export default SearchPagination;
