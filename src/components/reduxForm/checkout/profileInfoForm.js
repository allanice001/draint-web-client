import { Field, reduxForm } from 'redux-form';
import { email, password, phone, required } from '../validators';

import Input from '../input/input';
import React from 'react';
import { connect } from 'react-redux';
import styles from './customerInfo.module.scss';

let ProfileInfoForm = props => {
  const { handleSubmit } = props;
  return (
    <div className={`${styles.form_wrapper} ${styles.create}`}>
      <div className={styles.title}>
        Personal info
        <form className="form-wrapper" onSubmit={handleSubmit}>
          <div className={styles.field}>
            <Field
              name="first_name"
              component={Input}
              validate={required}
              label="First Name"
            />
          </div>
          <div className={styles.field}>
            <Field
              name="last_name"
              component={Input}
              validate={required}
              label="Last Name"
            />
          </div>
          <div className={styles.field}>
            <Field
              name="draint_profile_name"
              component={Input}
              validate={required}
              label="Draint Profile Name"
            />
          </div>
          <div className={styles.field}>
            <Field
              name="email"
              component={Input}
              validate={[required, email]}
              label="Email"
            />
          </div>
          <div className={styles.field}>
            <Field
              name="phone"
              component={Input}
              validate={[required, phone]}
              label="Phone"
            />
          </div>
          <div className={styles.field}>
            <Field
              name="password"
              component={Input}
              validate={required}
              label="Password"
              type="password"
            />
          </div>
          <div className={styles.field}>
            <Field
              name="confirm_password"
              component={Input}
              validate={required}
              label="Confirm Password"
              type="password"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

ProfileInfoForm = reduxForm({
  form: 'profileInfoForm',
  destroyOnUnmount: false,
  validate: password,
})(ProfileInfoForm);

export default ProfileInfoForm = connect(state => ({
  initialValues: {
    first_name: state.user.account.first_name,
    last_name: state.user.account.last_name,
    phone: state.user.account.phone,
  },
}))(ProfileInfoForm);
