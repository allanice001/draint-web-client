import React from 'react';
import * as Button from 'components/shared/button';
import styles from './shipping-manual-form.module.scss';
import { UNSPECIFIED } from '../../../constants/components/master/shipping-manual-form';

export function FormButtonsContent({
  order,
  onSave,
  onFinalize,
  onClear,
  isValidForm,
  isChanged,
}) {
  const {
    delivered,
    shipment: { tracker_id: trackerId },
  } = order;

  return (
    <div className={styles.buttons_wrapper}>
      <div className={styles.buttons}>
        <Button.Primary
          className={styles.button}
          onClick={onSave}
          disabled={isValidForm || isChanged}
        >
          Save
        </Button.Primary>
        {!isChanged && (
          <Button.Secondary className={styles.button} onClick={onClear}>
            Clear
          </Button.Secondary>
        )}
      </div>

      {trackerId !== UNSPECIFIED && (
        <div className={styles.finalize_wrapper}>
          <Button.Success
            className={styles.button}
            onClick={onFinalize}
            disabled={delivered}
          >
            Finalize order
          </Button.Success>
        </div>
      )}
    </div>
  );
}
