import './selectPaymentSystem.scss';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';

export default function selectPaymentSystem(props) {
  const { handlePaymentSystem, paymentSystem } = props;
  return (
    <div style={{ textAlign: 'center' }}>
      <form id="select-payment-system-form">
        <FormControl>
          <FormLabel>Select payment</FormLabel>
          <RadioGroup
            aria-label="paymentSystem"
            name="paymentSystem"
            value={paymentSystem}
            onChange={handlePaymentSystem}
          >
            <FormControlLabel
              value="PayPal"
              control={<Radio color="primary" />}
              label="PayPal"
            />
            <FormControlLabel
              value="Stripe"
              control={<Radio color="primary" />}
              label="Credit Card"
            />
          </RadioGroup>
        </FormControl>
      </form>
    </div>
  );
}
