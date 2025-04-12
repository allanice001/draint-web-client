import { Field, reduxForm } from 'redux-form';
import React, { useRef } from 'react';
import Icons from 'components/icons';
import Select from 'components/reduxForm/select/select';
import cx from 'classnames';
import styles from './pagination.module.scss';
import { useCollectorTheme } from 'hooks/use-theme';

function getPages(page, pages, setPage, pageLoad) {
  const res = [];
  let end = 1;
  if (page - 1 === 0 && pages >= page + 2) {
    end = page + 2;
  } else if (page + 1 >= pages) {
    end = pages;
  } else {
    end = page + 1;
  }

  // if (pages < 2) return res;

  for (let i = page - 1 || 1; i <= end; i++) {
    res.push(
      <button
        key={i}
        type="button"
        className={cx(styles.pagination__button, styles.page, {
          [styles.active]: i === page,
        })}
        onClick={() => (i !== page ? setPage(i) : undefined)}
        disabled={pageLoad}
      >
        {i}
      </button>
    );
  }
  return res;
}

const LIST_OF_PAGE_SIZE = [
  { label: '2', value: 2 },
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '30', value: 30 },
];

const CountForm = reduxForm()(({ disabled, list }) => (
  <Field
    name="count"
    component={Select}
    small
    className={styles.select}
    disabled={disabled}
    list={list}
  />
));

const Pagination = ({
  listOfPageSize = LIST_OF_PAGE_SIZE,
  page,
  setPage,
  pages,
  maxCount: total,
  count: displayed,
  setCount = () => {},
  type = '',
  countForm,
  pageLoad,
}) => {
  const buttonBG = useRef();
  useCollectorTheme(buttonBG);

  const classNames = cx(styles.pagination, {
    [styles.pagination__center]: type === 'artworkList',
  });

  return (
    <div className={classNames}>
      <div className={styles.pagination__pagination}>
        <button
          type="button"
          className={cx(styles.pagination__button, styles.prev)}
          onClick={() => {
            setPage(page - 1 || 1);
          }}
          disabled={page - 1 === 0 || pageLoad}
          ref={buttonBG}
        >
          <Icons.ArrowRight />
        </button>

        {getPages(page, +pages, setPage, pageLoad)}

        <button
          type="button"
          className={cx(styles.pagination__button, styles.next)}
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page === pages || pages === 0 || pageLoad}
        >
          <Icons.ArrowRight />
        </button>
      </div>

      {!countForm && (
        <div className={styles.pagination__displaying}>
          Displaying&nbsp;{displayed}&nbsp;of&nbsp;{total}{' '}
          <CountForm
            onChange={({ count }) =>
              count && parseInt(count, 10) !== displayed
                ? setCount(parseInt(count, 10))
                : undefined
            }
            form={`countForm-${type}`}
            disabled={pages === 0}
            list={listOfPageSize}
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;
