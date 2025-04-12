import React, { useCallback, useState } from 'react';

import BasicDropDown from 'components/shared/basic-dropdown/basic-dropdown';
import ButtonSecondary from 'components/shared/button-secondary/button-secondary';
import { Field } from 'redux-form';
import Icons from 'components/icons';
import Radio from 'components/reduxForm/radio/radio';
import cx from 'classnames';
import { FILTER, SORT } from 'constants/contacts';
import styles from './search-form.module.scss';

const SearchInput = ({ input }) => {
  return (
    <input
      className={styles.input}
      placeholder="Search"
      value={input.value}
      name={input.name}
      onChange={input.onChange}
    />
  );
};

const SortOptions = ({ onChange }) => {
  const [timeoutId, setTimeoutId] = useState();

  const handleChange = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(
      setTimeout(() => {
        onChange();
      })
    );
  }, [onChange, timeoutId, setTimeoutId]);

  return (
    <div className={cx(styles.sort)}>
      <h4 className={cx(styles.sort_title)}>Sort by:</h4>

      <Field
        component={Radio}
        list={SORT}
        onChange={handleChange}
        name="sort"
      />
      <br/>
      <h4 className={cx(styles.sort_title)}>Filter by:</h4>

      <Field
        component={Radio}
        list={FILTER}
        onChange={handleChange}
        name="filter"
      />
    </div>
  );
};

export default function SearchForm(props) {
  const { onChange } = props;
  const [isOpenSortOptions, setIsOpenSortOptions] = useState(false);
  const [timeoutId, setTimeoutId] = useState();

  const onSortDropDownOpen = useCallback(() => {
    setIsOpenSortOptions(true);
  }, []);

  const onSortDropDownClose = useCallback(() => {
    setIsOpenSortOptions(false);
  }, []);

  const handleChange = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(
      setTimeout(() => {
        onChange();
      }, 1000)
    );
  }, [onChange, timeoutId, setTimeoutId]);

  return (
    <div className={styles.search_wrapper}>
      <div className={styles.search_input_wrapper}>
        <Icons.SearchContactIcon className={styles.search_icon} />
        <Field component={SearchInput} name="search" onChange={handleChange} />
      </div>

      <div className={styles.buttons_wrapper}>
        <BasicDropDown
          useClick
          content={<SortOptions onChange={onChange} />}
          onOpen={onSortDropDownOpen}
          onClose={onSortDropDownClose}
        >
          <ButtonSecondary
            icon={<Icons.SortIcon />}
            active={isOpenSortOptions}
          />
        </BasicDropDown>
      </div>
    </div>
  );
}
