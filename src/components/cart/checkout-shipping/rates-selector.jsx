import './radio.scss';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';

import Radio from '@material-ui/core/Radio';
import React from 'react';
import classNames from 'classnames';
import styles from './checkout-shipping-info.module.scss';

function RatesSelector({ item, handleRateChange }) {
  const calculatedRate = item.calculatedRate || [];
  const itemRates = item.rates || [];
  const expandedButton = classNames(`${styles.rate_warning}`, {
    [`${styles.rate_warning_hiden}`]: item.shippingId,
  });

  return (
    <>
      <div className={styles.shipping_selector}>
        <div className={styles.artwork_title_wrapper}>
          <span className={styles.artwork_title}>{item.title}</span>
          <span className={styles.price}>€ {item.totalCost.toFixed(2)}</span>
        </div>
        <FormControl component="fieldset">
          <FormLabel component="legend" className={styles.radioLegend}>
            {!item.shippingId && 'Choose the shipping service'}
            {item.shippingId && 'Your shipment rate with taxes and duties'}
          </FormLabel>
          <RadioGroup
            className={styles.radio}
            aria-label="shipment-rate-select"
            name="shipment-rate-select"
            value={item.selectedRateId}
            onChange={e => handleRateChange(e, item)}
          >
            {!calculatedRate || !calculatedRate.length
              ? itemRates.map((rate, index) => (
                  <FormControlLabel
                    key={index}
                    classes={{ root: 'radio_checked' }}
                    value={rate.rateCode}
                    control={<Radio />}
                    label={`${rate.rateName} € ${rate.ratePrice}`}
                  />
                ))
              : calculatedRate.map((rate, index) => (
                  <FormControlLabel
                    key={index}
                    value={rate.rateCode}
                    control={<Radio />}
                    label={`${rate.rateName} € ${rate.ratePrice}`}
                  />
                ))}
          </RadioGroup>
          <span className={expandedButton}>
            {!item.shippingId
              ? 'Your invoice may vary from the displayed reference rates'
              : 'Your invoice may vary from the displayed reference rates'}
          </span>
        </FormControl>
      </div>
    </>
  );
}

export default RatesSelector;
