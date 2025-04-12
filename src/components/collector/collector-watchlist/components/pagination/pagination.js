import Icons from 'components/icons';
import React from 'react';
import styles from './pagination.module.scss';

function getPages(page, pages, setPage) {
  const res = [];
  let end;
  if (page - 1 === 0 && pages >= page + 2) {
    end = page + 2;
  } else if (page + 1 >= pages) {
    end = pages;
  } else {
    end = page + 1;
  }

  for (let i = page - 1 || 1; i <= end; i++) {
    res.push(
      <button
        key={i}
        type="button"
        className={`${styles.pagination__button} ${styles.page} ${
          i === page ? styles.active : ''
        }`}
        onClick={() => (i !== page ? setPage(i) : undefined)}
      >
        {i}
      </button>
    );
  }
  return res;
}

const Pagination = ({ page, setPage, pages }) => (
  <div className={styles.pagination}>
    <div className={styles.pagination_pagination}>
      <button
        type="button"
        className={`${styles.pagination__button} ${styles.prev}`}
        onClick={() => {
          setPage(page - 1 || 1);
        }}
        disabled={page - 1 === 0}
      >
        <Icons.ArrowRight />
      </button>

      {getPages(page, pages, setPage)}

      <button
        type="button"
        className={`${styles.pagination__button} ${styles.next}`}
        onClick={() => {
          setPage(page + 1);
        }}
        disabled={page === pages || pages === 0}
      >
        <Icons.ArrowRight />
      </button>
    </div>
  </div>
);

export default Pagination;
