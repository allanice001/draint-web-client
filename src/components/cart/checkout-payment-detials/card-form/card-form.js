import React, { useEffect, useState } from 'react';
import {
  setPaymentSystemAccess,
  setPaymentSystemIsFromValid,
} from '../../../../redux/checkout/actions/paymentSystemActions';

import StripeInformation from '../../../materialForm/checkout/srtipeInformation';
import styles from '../checkout-payment-details.module.scss';
import { useDispatch } from 'react-redux';

const CartForm = ({ paymentSystem, stripeInformationForm }) => {
  const dispatch = useDispatch();
  const [cardHolderName, setCardHolderName] = useState(
    paymentSystem.cardHolderName
  );

  function cardHolderChange(value) {
    setCardHolderName(value);
    paymentSystem.cardHolderChangeName = cardHolderName;
  }

  useEffect(() => {
    dispatch(setPaymentSystemIsFromValid(true));
    dispatch(setPaymentSystemAccess(true));
  }, [dispatch]);

  useEffect(() => {
    paymentSystem.cardHolderChangeName = cardHolderName;
  }, [paymentSystem, cardHolderName]);

  return (
    <>
      <div className={styles.title}>Payment details</div>
      <div className={styles.field}>
        <div className={styles.label}>Cardholder name</div>
        <input
          type="text"
          value={cardHolderName}
          onChange={e => cardHolderChange(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        {/*<div className={styles.label}>Card details</div>*/}
        <StripeInformation ref={stripeInformationForm} />
      </div>
    </>
  );
};

export default CartForm;
