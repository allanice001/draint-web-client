import {
  FIELD_TYPE,
  PRICE,
  PRICE_LABEL,
  PRICE_PLACEHOLDER,
} from 'constants/components/offer-from/fields';
import { Field, reduxForm } from 'redux-form';
import { AUCTION_FORM } from 'constants/components/forms';
import NumberInput from 'components/reduxForm/input/number-input';
import React from 'react';
import { price as priceValid } from 'components/reduxForm/validators';
import styles from './auction-modal.module.scss';

const AuctionFormContent = reduxForm({
  form: AUCTION_FORM,
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
        formName={AUCTION_FORM}
        classNameError={styles.error}
        placeholder={PRICE_PLACEHOLDER}
        validate={[priceValid]}
      />
    </form>
  );
});

export default AuctionFormContent;
