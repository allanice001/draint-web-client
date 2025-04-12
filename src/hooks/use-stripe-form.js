import * as CONSTANTS from 'constants/components/pricing';
import {
  CardNumberElement,
  IbanElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import {
  handleStripeCreatePM,
  setUpdating,
} from 'redux/billing/billing-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export const useStripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { payment_method_inputs: pmForm } = useSelector(store => store.form);

  const [error, setError] = useState(false);

  const onChangeErrorHandler = ({ error }) => {
    if (error) {
      return setError(true);
    }

    return setError(false);
  };

  const submitPMCardForm = (event, initialForm) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    dispatch(setUpdating(true));

    stripe
      .createPaymentMethod({
        type: CONSTANTS.CARD_PM,
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: pmForm.values.name || initialForm.name,
          email: pmForm.values.email || initialForm.email,
        },
      })
      .then(response => dispatch(handleStripeCreatePM(response)));
  };

  const submitPMSepaDebit = (event, initialForm) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    dispatch(setUpdating(true));

    stripe
      .createPaymentMethod({
        type: CONSTANTS.DEBIT_PM,
        sepa_debit: elements.getElement(IbanElement),
        billing_details: {
          name: pmForm.values.name || initialForm.name,
          email: pmForm.values.email || initialForm.email,
        },
      })
      .then(response => dispatch(handleStripeCreatePM(response)));
  };

  return {
    submitPMCardForm,
    setError,
    error,
    onChangeErrorHandler,
    submitPMSepaDebit,
  };
};
