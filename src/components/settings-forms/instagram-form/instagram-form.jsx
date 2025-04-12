import { Field, reduxForm } from 'redux-form';
import {
  INSTAGRAM_LINK_LABEL,
  INSTAGRAM_LINK_PLACEHOLDER,
} from 'constants/components/signup-page';
import Icons from 'components/icons';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import { connect } from 'react-redux';
import { getInstagramUsername } from 'helpers/instagram-url-checker';
import { instagramUsernameValidator } from 'components/reduxForm/validators';
import styles from './instagram-form.module.scss';

const InstagramForm = ({ handleSubmit, valid, disabled }) => {
  return (
    <section className={styles.section}>
      <h3 className={`group-title ${styles.title}`}>
        Connect Instagram <Icons.Instagram2 className={styles.icon} />
      </h3>

      <form onSubmit={handleSubmit}>
        <Field
          className={styles.form__field}
          validate={[instagramUsernameValidator]}
          component={Input}
          name="instagram"
          placeholder={INSTAGRAM_LINK_PLACEHOLDER}
          label={INSTAGRAM_LINK_LABEL}
          disabled={disabled}
        />

        <div className={styles.form__footer}>
          <button
            type="submit"
            className={`primary-button ${styles.form__button}`}
            disabled={!valid || disabled}
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

const mapStateToProps = state => {
  const { account = {}, loading } = state.dashboard.settings;

  return {
    loading,
    initialValues: {
      ...account,
      instagram: getInstagramUsername(account.instagram),
    },
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: 'instagramForm',
    destroyOnUnmount: true,
    enableReinitialize: true,
  })(InstagramForm)
);
