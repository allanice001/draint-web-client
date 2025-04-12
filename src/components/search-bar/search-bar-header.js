import { Field, change, formValueSelector, reduxForm } from 'redux-form';

import Icons from '../icons';
import Input from '../reduxForm/input/input';
import React from 'react';
import Select from '../reduxForm/select/select';
import SelectChecked from '../reduxForm/select/select-checked';
import { connect } from 'react-redux';
import { isoCountries as options } from '../countries/list';
import styles from './search-bar-header.module.scss';

let SearchBarHeader = props => (
  <form onSubmit={props.handleSubmit} className={styles.form}>
    <div className={styles.form__row}>
      <Field
        name="type"
        className={styles.select__wrapper}
        selectClassName={styles.select}
        component={SelectChecked}
        onChange={() => props.dispatch(change('searchBarHeader', 'search', ''))}
        list={[
          { label: 'Name', value: 'name' },
          { label: 'Country', value: 'country' },
          { label: 'Hashtag', value: 'hashtag' },
        ]}
      />

      {props.searchType !== 'country' ? (
        <Field
          name="search"
          label={false}
          inputClassName={styles.input}
          className={styles.input__wrapper}
          component={Input}
        />
      ) : (
        <Field
          name="search"
          label={false}
          className={styles.input__wrapper}
          selectClassName={styles.input__select}
          component={Select}
          multi
          list={[
            ...options.map(({ cname }) => ({
              label: cname,
              value: cname,
            })),
          ]}
        />
      )}
      <button type="submit" className={styles.button}>
        <Icons.SearchLarge className={styles.button__icon} />
      </button>
    </div>
  </form>
);

SearchBarHeader = reduxForm({
  form: 'searchBarHeader',
  initialValues: { type: 'name' },
})(SearchBarHeader);

const selector = formValueSelector('searchBarHeader');
export default SearchBarHeader = connect(state => {
  const searchType = selector(state, 'type');
  return {
    searchType,
  };
})(SearchBarHeader);
