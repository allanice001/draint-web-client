import {
  FIELD_TYPE,
  PRICE,
  PRICE_LABEL,
  PRICE_PLACEHOLDER,
} from 'constants/components/offer-from/fields';
import { Field, reduxForm } from 'redux-form';
import NumberInput from 'components/reduxForm/input/number-input';
import { OFFER_FORM } from 'constants/components/forms';
import React from 'react';
import { price as priceValid } from 'components/reduxForm/validators';
import styles from './artwork-page-offer-modal.module.scss';

const OfferFormContent = reduxForm({
  form: OFFER_FORM,
  enableReinitialize: true,
  destroyOnUnmount: false,
  touchOnBlur: true,
})(() => {
  return (
    <form className={styles.form}>
      <Field
        type={FIELD_TYPE}
        name={PRICE}
        label={PRICE_LABEL}
        component={NumberInput}
        classNameError={styles.error}
        formName={OFFER_FORM}
        placeholder={PRICE_PLACEHOLDER}
        validate={[priceValid]}
      />
    </form>
  );
});

export default OfferFormContent;
