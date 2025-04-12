import * as FIELDS from 'constants/components/master/shipping-manual-form';
import { reduxForm } from 'redux-form';
import React from 'react';
import styles from './shipping-manual-form.module.scss';
import { FormUserContent } from './form-user-content';
import { FormOrderContent } from './form-order-content';
import { FormButtonsContent } from './form-buttons-content';

const ShippingManualForm = reduxForm({
  enableReinitialize: true,
  destroyOnUnmount: false,
})(
  ({
    order,
    onSave,
    onClear,
    onFinalize,
    isDisabled,
    isValidForm,
    isChanged,
  }) => {
    return (
      <form className={styles.from_wrapper}>
        <FormOrderContent order={order} isDisabled={isDisabled} />
        <div className={styles.content_wrapper}>
          <FormUserContent prefix={FIELDS.FROM} isDisabled={isDisabled} />
          <FormUserContent prefix={FIELDS.TO} isDisabled={isDisabled} />
        </div>
        <FormButtonsContent
          onSave={onSave}
          onClear={onClear}
          onFinalize={onFinalize}
          isValidForm={isValidForm}
          isChanged={isChanged}
          order={order}
        />
      </form>
    );
  }
);

export default ShippingManualForm;
