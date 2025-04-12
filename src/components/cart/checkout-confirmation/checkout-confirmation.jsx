import { CartList } from 'components/cart/cart-list/cart-list';
import React from 'react';
import styles from './checkout-confirmation.module.scss';

export default function CheckoutConfirmation(props) {
  const { cartItems } = props;

  return (
    <div className="container">
      <div className={styles.items}>
        <div className={styles.title}>Items</div>
        <CartList items={cartItems} checkoutConfirm />
      </div>
    </div>
  );
}
