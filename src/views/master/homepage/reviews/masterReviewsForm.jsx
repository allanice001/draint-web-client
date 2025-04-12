import { Field, reduxForm } from 'redux-form';
import { maxPoints, number, required } from 'components/reduxForm/validators';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import SelectField from 'components/reduxForm/select/select';
import Textarea from 'components/reduxForm/textarea/textarea';
import styles from './reviews.module.scss';
import useCountryList from 'hooks/use-country-list';
import { useSelector } from 'react-redux';

const ReviewsForm = reduxForm({
  form: 'homepageReviews',
  enableReinitialize: true,
  destroyOnUnmount: false,
})(props => {
  const { values } = useSelector(store => store.form.homepageReviews);
  const isDisabled =
    !values?.name || !values?.points || !values?.message || !values?.country;
  const countries = useCountryList();

  return (
    <form className={styles.form}>
      <Field
        name="name"
        component={Input}
        validate={required}
        label="full name"
        maxLength={20}
        required
      />
      <Field
        name="points"
        component={Input}
        validate={[number, maxPoints]}
        label="points"
        required
      />
      <Field
        name="message"
        component={Textarea}
        validate={required}
        label="content"
        maxLength={200}
        required
      />
      <div style={{ marginBottom: '15px' }}>
        <Field
          name="country"
          label="country"
          placeholder="Country"
          component={SelectField}
          list={countries}
          single
          validate={[required]}
        />
      </div>

      <button
        type="button"
        className="primary-button"
        disabled={isDisabled || !props.valid}
        onClick={() => {
          !props.editMode
            ? props.handleCreate(values)
            : props.handleSave(values);
        }}
      >
        {`${props.editMode ? 'Update' : 'Create'} review`}
      </button>
    </form>
  );
});

export default ReviewsForm;
