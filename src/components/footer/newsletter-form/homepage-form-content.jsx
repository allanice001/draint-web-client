import { Field } from 'redux-form';
import { HOME_NEWSLETTER_FORM } from 'constants/components/weekly-newsletter';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import { email } from 'components/reduxForm/validators';

import styles from './homepage-form-content.module.scss';

export const HomepageFormContent = props => {
  const { onClick, invalid } = props;

  return (
    <form>
      <div className={styles.form_field}>
        <Field
          name={HOME_NEWSLETTER_FORM.field_name}
          component={Input}
          placeholder={HOME_NEWSLETTER_FORM.field_placeholder}
          validate={[email]}
        />
        <button
          type={HOME_NEWSLETTER_FORM.button_type}
          className={`primary-button ${styles.input_button}`}
          onClick={onClick}
          disabled={invalid}
        >
          {HOME_NEWSLETTER_FORM.button_title}
        </button>
      </div>
    </form>
  );
};
