import React from 'react';
import styles from './artwork-shipping-form.module.scss';

function ArtworkRateSection({ price, rate, getRates, ratesFetching }) {
  return (
    <div className={styles.shipping__wrapper}>
      <div className={styles.shipping}>
        <span className={styles.param}>
          {'Artwork price'} <b>&euro; {price}</b>
        </span>

        <span className={styles.param}>
          {!rate.length && !ratesFetching && (
            <>
              {'Shipping'} <b>&euro;</b>
              <button
                type="button"
                className={`primary-button ${styles.button__add}`}
                onClick={() => getRates()}
              >
                Get shipping rates
              </button>
            </>
          )}

          {!rate.length && ratesFetching && (
            <b className={`${styles.rate_text} ${styles.blurred}`}>
              calculating rates...
            </b>
          )}

          {rate.length > 0 && !ratesFetching && (
            <>
              {'Shipping'} <b>&euro; {rate}</b>
            </>
          )}
        </span>
      </div>
      <b className={styles.price}>
        &euro;&nbsp;{(+price + (rate && rate.length ? +rate : 0)).toFixed(2)}
      </b>
    </div>
  );
}

export default ArtworkRateSection;
