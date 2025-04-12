import { Field, change, reduxForm, submit } from 'redux-form';

import React from 'react';
import SelectField from '../../reduxForm/select/select';
import { connect } from 'react-redux';
import styles from '../../artwork/artwork-full-search/artwork-full-search.module.scss';

const getInitialValues = artworksSearch => {
  const { country } = artworksSearch;
  if (country) return { [`country`]: country };
  return {};
};

let CountryFullSearch = function({ handleSubmit, handleChange, options }) {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        onChange={handleChange}
        arrowStyles={styles.arrow}
        component={SelectField}
        list={options}
        name="country"
        placeholder="all countries"
        selectClassName={styles.select}
      />
    </form>
  );
};

CountryFullSearch = reduxForm({
  form: 'mapSearchForm',
  onChange: (values, dispatch, props) => {
    if (props.anyTouched || props.dirty) {
      props.formChange('largeSearchForm', 'country', values.country);

      setTimeout(() => {
        dispatch(submit('largeSearchForm'));
      });
    }
  },
})(CountryFullSearch);

CountryFullSearch = connect(
  state => ({
    initialValues: getInitialValues(state.form?.largeSearchForm?.values || {}),
  }),
  { formChange: change }
)(CountryFullSearch);

export default CountryFullSearch;
