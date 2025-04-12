import { Field, reduxForm } from 'redux-form';

import Input from 'components/reduxForm/input/input';
import Radio from 'components/reduxForm/radio/radio';
import React from 'react';
import Select from 'components/reduxForm/select/select';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { isoCountries as countries } from 'components/countries/list';
import { required } from 'components/reduxForm/validators';
import styles from './status-form.module.scss';
import {
  COUNTRY_PLACEHOLDER,
  STATUS_FORM,
  STATUS_FORM_LIST,
} from 'constants/components/profile-settings-form';

function StatusForm(props) {
  const { Form, handleSubmit, disabled = false, valid, className } = props;

  if (!Form) return null;

  const classNames = classnames(styles.section, className);
  const isEmployee = Form.values?.is_employee === 'true';

  return (
    <section className={classNames}>
      <h3 className={`group-title ${styles.title}`}>{STATUS_FORM.title}</h3>

      <form className="password-change" onSubmit={handleSubmit}>
        <Field
          name="is_employee"
          component={Radio}
          validate={required}
          list={STATUS_FORM_LIST}
        />
        <Field
          name="legal_name"
          component={Input}
          className={styles.form__field}
          validate={isEmployee ? required : () => {}}
          label="Company"
          disabled={!isEmployee || disabled}
        />
        <Field
          name="vat"
          component={Input}
          className={styles.form__field}
          validate={isEmployee ? required : () => {}}
          label="VAT"
          disabled={!isEmployee || disabled}
        />
        <Field
          name="country"
          component={Select}
          className={styles.form__field}
          validate={isEmployee ? required : () => {}}
          label="Country"
          placeholder={COUNTRY_PLACEHOLDER}
          disabled={!isEmployee || disabled}
          list={countries.map(country => ({
            label: country.cname,
            value: country.ccode,
          }))}
        />
        <div className={styles.form__footer}>
          <button
            className={`primary-button ${styles.form__button}`}
            type="submit"
            disabled={!valid || disabled}
          >
            Change
          </button>
        </div>
      </form>
    </section>
  );
}

function mapStateToProps(store) {
  const { account } = store.dashboard.settings;
  const { statusForm } = store.artwork.artworkData.requiredSaleInfoModalForms;
  const { ownerInfo } = store.artwork.artworkData.currentArtwork;

  function getStatus(is_employee) {
    if (is_employee === true) return 'true';
    if (is_employee === false) return 'false';
    return undefined;
  }

  function setInitialValues() {
    if (statusForm) {
      return {
        is_employee: getStatus(ownerInfo.isEmployee),
        ...ownerInfo.employeeData,
      };
    }

    return {
      is_employee: getStatus(account.is_employee),
      ...account.employeeData,
    };
  }

  if (account) {
    return {
      Form: store.form.statusForm,
      enableReinitialize: true,

      initialValues: setInitialValues(),
    };
  }
  return {};
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'statusForm',
  })(StatusForm)
);
