import { Field, reduxForm } from 'redux-form';
import {
  email,
  firstLetterNotSpace,
  length30,
  required,
  username,
} from 'components/reduxForm/validators';

import Input from 'components/reduxForm/input/input';
import React from 'react';
import SelectField from 'components/reduxForm/select/select';
import cx from 'classnames';
import styles from './masterPermission.module.scss';

export const InviteUserForm = reduxForm({
  form: 'invite',
  enableReinitialize: true,
  destroyOnUnmount: false,
})(props => {
  const { handleSubmit, invalid } = props;

  const fieldsList = [
    {
      name: 'name',
      placeholder: 'User first name',
      validate: [required, length30, firstLetterNotSpace, username],
    },
    {
      name: 'surname',
      placeholder: 'User last name',
      validate: [required, length30, firstLetterNotSpace, username],
    },
    {
      name: 'email',
      placeholder: 'User email',
      validate: [required, email, firstLetterNotSpace],
    },
  ];

  const selectList = [
    { label: 'User', id: 1, key: 'owner', value: 'owner' },
    { label: 'Admin', id: 2, key: 'admin', value: 'admin' },
    { label: 'Editor', id: 3, key: 'editor', value: 'editor' },
    { label: 'Analyst', id: 4, key: 'analyst', value: 'analyst' },
  ];

  return (
    <form className={cx(`${styles.form} ${styles['invites']}`)}>
      <div className={`${styles.filter}`}>
        {fieldsList.map(field => (
          <Field
            label=""
            name={field.name}
            component={Input}
            placeholder={field.placeholder}
            validate={field.validate}
          />
        ))}
        <Field
          name="permission"
          component={SelectField}
          placeholder="Select permission"
          list={selectList}
          className={styles.selector}
          validate={[required]}
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className={styles.inviteSubmit}
        disabled={invalid}
      >
        Send Invitation
      </button>
    </form>
  );
});
