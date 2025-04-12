import {
  ARTWORK_PRICE,
  DEFAULT_PRICE,
  DRAINT_FEE,
  NOT_AVAILABLE,
  PROCESSING_FEES,
  SHIPPING_COST,
} from 'constants/shipping-price/shipping-price';
import React from 'react';
import styles from './shipping-price.module.scss';

function ShippingItem({ amount, label, plus, payout }) {
  return (
    <div className={styles.piece}>
      <span className={styles.piece__label}>{label}</span>
      {!payout ? (
        <b className={styles.piece__amount}>
          {plus ? '+ ' : ' '} {amount ? `€ ${amount}` : NOT_AVAILABLE}
        </b>
      ) : (
        <b className={styles.piece__amount}>
          {payout ? '- ' : ' '} {amount ? `€ ${amount}` : NOT_AVAILABLE}
        </b>
      )}
    </div>
  );
}

function ShippingPrice({ price, shipping, vat, fixedVAT, plus = true }) {
  function getPrice() {
    const priceCent = Number(price * 100);
    const shippingCent = Number(shipping * 100);
    const vatCent = Number(fixedVAT * 100);

    if (plus) {
      return `€ ${(Number(priceCent + shippingCent) / 100).toFixed(2)}`;
    }

    return `€ ${(Number(priceCent - shippingCent - vatCent) / 100).toFixed(2)}`;
  }

  return (
    <div className={styles.footer}>
      <div className={styles.shipping}>
        <ShippingItem
          amount={price ? price.toFixed(2) : DEFAULT_PRICE}
          label={ARTWORK_PRICE}
        />
        {plus ? (
          <ShippingItem
            amount={shipping && shipping.toFixed(2)}
            label={SHIPPING_COST}
          />
        ) : (
          <>
            <ShippingItem
              amount={shipping && shipping.toFixed(2)}
              label={DRAINT_FEE}
              payout
            />
            <ShippingItem
              amount={fixedVAT && fixedVAT.toFixed(2)}
              label={PROCESSING_FEES}
              payout
            />
          </>
        )}
      </div>
      <div className={styles.price_wrapper}>
        <span className={styles.piece__label}>Total</span>

        <b className={plus ? styles.price : styles.price_price_green}>
          {getPrice()}
        </b>
      </div>
    </div>
  );
}

export default ShippingPrice;
