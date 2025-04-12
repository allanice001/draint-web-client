import { Field, reduxForm } from 'redux-form';

import Input from 'components/reduxForm/input/input';
import React from 'react';
import { Search } from 'components/icons/search';
import styles from './masterPermission.module.scss';

export const PermissionForm = reduxForm({
  form: 'permission',
  enableReinitialize: true,
  destroyOnUnmount: false,
})(props => {
  const { handleSubmit } = props;

  return (
    <form className={styles.form}>
      <div className={styles.filter}>
        <Field label="" name="query" component={Input} placeholder="Search" />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className={styles.filterSubmit}
      >
        <Search className={styles.icon} fill="#806BFF" />
      </button>
    </form>
  );
});
