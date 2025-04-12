import React from 'react';
import * as FIELDS from 'constants/components/master/shipping-manual-form';
import { Field } from 'redux-form';
import Input from 'components/reduxForm/input/input';
import { latinic, required } from 'components/reduxForm/validators';
import styles from './shipping-manual-form.module.scss';
import Calendar from 'components/order/modals/pickup-layout/calendar/calendar';
import { setMaxDate, shouldDisableDateManual } from 'services/pickup-service';

export function FormOrderContent({ order, isDisabled }) {
  const {
    isManual,
    pickupScheduled,
    shipment: { created_at: createdAt },
  } = order;

  return (
    <div className={styles.content_wrapper}>
      <div className={styles.order_column}>
        <div className={styles.order_row}>
          <Field
            name={FIELDS.TRACKER_ID}
            component={Input}
            disabled={isDisabled}
            label={FIELDS.TRACKER_ID_LABEL}
            placeholder={FIELDS.TRACKER_ID_HOLDER}
            validate={[required, latinic]}
          />
          <Field
            name={FIELDS.COURIER_DATE}
            component={Calendar}
            disabled={isDisabled}
            label={FIELDS.COURIER_DATE_LABEL}
            buttonClass={styles.c_btn}
            minDate={pickupScheduled}
            maxDate={setMaxDate(isManual, createdAt)}
            required
            validate={[required]}
            shouldDisableDateManual={shouldDisableDateManual}
          />
        </div>

        <div className={styles.order_row}>
          <Field
            name={FIELDS.DELIVERY_COMPANY}
            component={Input}
            disabled={isDisabled}
            label={FIELDS.DELIVERY_COMPANY_LABEL}
            placeholder={FIELDS.DELIVERY_COMPANY_HOLDER}
            validate={[latinic]}
          />
          <Field
            name={FIELDS.TRACKER_LINK}
            component={Input}
            disabled={isDisabled}
            label={FIELDS.TRACKER_LINK_LABEL}
            placeholder={FIELDS.TRACKER_LINK_HOLDER}
            validate={[latinic]}
          />
        </div>
      </div>
    </div>
  );
}
