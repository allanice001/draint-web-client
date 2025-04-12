import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import styles from './checkout-shipping-info.module.scss';

function ShippingButtons({
  item,
  isValid,
  reset,
  confirmShipment,
  cancelShipment,
  removeItemFromShipment,
  calculating
}) {
  const [load, setLoad] = useState(calculating);

  useEffect(() => {
    setLoad(calculating);
  }, [calculating]);

  const primaryButton = classNames(`${styles.button}`, {
    [styles.button__load]: load
  });
  const cancelButton = classNames(`${styles.button}`, `${styles.button__cancel}`);
  const deleteButton = classNames(`${styles.button}`, `${styles.button__delete}`);

  function calculateButtonName() {
    if (!item.shippingId && item.rateError) {
      return !load ? 'Recalculate rate' : 'Calculating...'
    }

    return !load ? 'Calculate rate' : 'Calculating...'
  }

  return (
    <div className={styles.buttons_wrapper}>
      <button
        type="button"
        className={primaryButton}
        onClick={() => {
          setLoad(true);
          confirmShipment(item);
        }}
        disabled={item.shippingId || isValid}
      >
        {calculateButtonName()}
      </button>

      <div className={styles.clear_delete_wrapper}>
        <button
          type="button"
          className={cancelButton}
          onClick={() => {
            cancelShipment(item);
            reset()
          }}
        >
          {item.shippingId ? 'Cancel' : 'Clear'}
        </button>
        {(!item.shippingId && item.rateError) && (
          <button
            type="button"
            className={deleteButton}
            onClick={() => removeItemFromShipment(item.id, item.seller_profile_id)}
            disabled={item.shippingId}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export default ShippingButtons;
