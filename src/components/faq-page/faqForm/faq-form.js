import * as Button from 'components/shared/button';

import { Field, reduxForm } from 'redux-form';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import Textarea from 'components/reduxForm/textarea/textarea';
import cx from 'classnames';
import styles from './faq-form.module.scss';

const FaqForm = reduxForm({
  form: 'faqForm',
  enableReinitialize: false,
  destroyOnUnmount: true,
})(props => {
  const {
    onCancelEditClick,
    name,
    onAcceptClick,
    secondName,
    className,
    fieldClass,
    firstType,
    secondType,
    area,
    editRole,
    firstFieldValidate,
    secondFieldValidate,
    invalid,
    validate,
    maxLength,
    placeholder,
  } = props;

  const editClasses = cx(styles.form, {
    [className]: className,
    [styles.role_form]: editRole,
  });

  return (
    <form className={editClasses}>
      <Field
        name={name}
        type={firstType || 'text'}
        component={Input}
        label={false}
        className={fieldClass}
        validate={validate || firstFieldValidate}
        placeholder={placeholder}
      />
      {secondName ? (
        <Field
          name={secondName}
          type={secondType || 'text'}
          component={!area ? Input : Textarea}
          label={false}
          validate={secondFieldValidate}
          maxLength={maxLength}
        />
      ) : null}
      <div className={styles.button_container}>
        <Button.Primary
          xs
          icon={<CheckIcon />}
          onClick={onAcceptClick}
          disabled={invalid}
        />

        <Button.Danger xs icon={<ClearIcon />} onClick={onCancelEditClick} />
      </div>
    </form>
  );
});

export default FaqForm;
