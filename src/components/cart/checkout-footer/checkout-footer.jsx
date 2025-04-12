import * as Button from 'components/shared/button';
import {
  CHECKOUT_CONFIRMATION_STEP,
  PAYMENT_INFO_STEP,
} from 'constants/components/checkout';
import ArrowIcon from 'components/icons/arrow';
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import cx from 'classnames';
import styles from './checkout-footer.module.scss';
import theme from 'config/mui-theme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export function CheckoutFooter({
  loading,
  previousStep,
  handleNext,
  step,
  disabledBack,
  disabledNext,
  disabledChange,
  canChange,
  handleChangeForms,
  summaryInfo,
  cancelShipment,
  cancelOrder,
  sendCheckout,
  disabledENV,
}) {
  const paymentStepButtons = cx(`${styles.footer}`, {
    [styles.footer__payment_step]: step === CHECKOUT_CONFIRMATION_STEP,
  });

  const isDesktop = useMediaQuery(
    theme.breakpoints.up(theme.breakpoints.values.md)
  );

  return (
    <div className={styles.root}>
      <section className={styles.footer_wrapper}>
        <div className="container">
          <div className={paymentStepButtons}>
            {step !== CHECKOUT_CONFIRMATION_STEP && (
              <Button.Secondary
                className={styles.button}
                icon={isDesktop && <ArrowIcon className={styles.reverse} />}
                sm
                onClick={() => cancelShipment()}
                disabled={disabledBack}
              >
                Back
              </Button.Secondary>
            )}

            {step === CHECKOUT_CONFIRMATION_STEP && (
              <Button.Secondary
                sm
                className={styles.button}
                disabled={disabledNext || loading}
                onClick={() => cancelOrder()}
              >
                Cancel
              </Button.Secondary>
            )}

            {step !== CHECKOUT_CONFIRMATION_STEP && (
              <span className={styles.price}>€ {summaryInfo}</span>
            )}

            {loading ? (
              <CircularProgress size={18} />
            ) : (
              <div className={styles.actions}>
                {canChange && (
                  <Button.Primary
                    sm
                    className={styles.button}
                    onClick={handleChangeForms}
                    disabled={disabledChange}
                  >
                    Change
                  </Button.Primary>
                )}
                {step !== CHECKOUT_CONFIRMATION_STEP && (
                  <Button.Primary
                    sm
                    className={styles.button}
                    disabled={disabledNext}
                    onClick={() => handleNext()}
                    icon={isDesktop && <ArrowIcon />}
                  >
                    {step === PAYMENT_INFO_STEP ? 'Finalize' : 'Next'}
                  </Button.Primary>
                )}
                {step === CHECKOUT_CONFIRMATION_STEP && (
                  <Button.Primary
                    sm
                    className={styles.button}
                    disabled={disabledNext}
                    // disabled={disabledENV}
                    onClick={() => sendCheckout()}
                  >
                    Pay € {summaryInfo}
                  </Button.Primary>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <div className={styles.shadow} />
    </div>
  );
}
