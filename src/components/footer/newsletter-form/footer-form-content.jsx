import {
  FOOTER_NEWSLETTER_FORM,
  THANKS_MESSAGE,
} from 'constants/components/weekly-newsletter';
import { Field } from 'redux-form';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import { email } from 'components/reduxForm/validators';

import styles from 'components/footer/footer.module.scss';

export const FooterFormContent = props => {
  const { onClick, invalid, mobile } = props;

  return (
    <form>
      <div className={styles.form_field}>
        <Field
          name={FOOTER_NEWSLETTER_FORM.field_name}
          component={Input}
          placeholder={FOOTER_NEWSLETTER_FORM.field_placeholder}
          validate={[email]}
        />
        <button
          type={FOOTER_NEWSLETTER_FORM.button_type}
          className={`primary-button ${styles.input_button}`}
          onClick={onClick}
          disabled={invalid}
        >
          {FOOTER_NEWSLETTER_FORM.button_title}
        </button>
        {!mobile && <span className={styles.input_info}>{THANKS_MESSAGE}</span>}
      </div>
    </form>
  );
};
