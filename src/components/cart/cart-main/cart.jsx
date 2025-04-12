import React, { useEffect } from 'react';
import { CartList } from 'components/cart/cart-list/cart-list';
import { CartWrapper } from 'components/cart/cart-wrapper/cart-wrapper';
import CheckoutLogInModal from 'components/cart/checkout-modal/checkout-login-modal';
import CheckoutStepper from 'components/cart/checkout-stepper/stepper-checkout';
import { pageScroll } from 'services/pageScroller';
import styles from './cart.module.scss';
import { useCart } from 'hooks/use-cart';

export function Cart() {
  const {
    checkout,
    cartItems,
    cartTotal,
    changeSummaryInfo,
    removeItem,
    loading,
    handleProceedToCheckout,
    isEmptyCart,
    loadCartItems,
    openModal,
    handleCloseDialogue,
    handleProceedWithoutAccount,
  } = useCart();

  useEffect(() => {
    pageScroll();
  }, [checkout.proceeded, cartItems.length]);

  return (
    <>
      {checkout.proceeded ? (
        <CheckoutStepper
          cartItems={cartItems}
          summaryInfo={cartTotal}
          changeSummaryInfo={changeSummaryInfo}
          removeItem={removeItem}
        />
      ) : (
        <div className={styles.cart_background}>
          <CartWrapper
            loading={loading}
            items={cartItems}
            summary={cartTotal}
            handleCheckout={handleProceedToCheckout}
            isEmptyCart={isEmptyCart}
          >
            <CartList
              items={cartItems}
              removeItem={removeItem}
              isEmptyCart={isEmptyCart}
              loadCartItems={loadCartItems}
            />
          </CartWrapper>
          <CheckoutLogInModal
            open={openModal}
            handleClose={handleCloseDialogue}
            handleProceedWithoutAccount={handleProceedWithoutAccount}
          />
        </div>
      )}
    </>
  );
}
