import { PAY_PAL, SEPA, SOFORT, STRIPE } from 'constants/components/pricing';

import Icon from 'components/icons';
import React from 'react';
import styles from './mobile-payments-select.module.scss';

function MobilePaymentMethodsSelect({
  handlePaymentSystem,
  checkedPlan,
  handleSubscriptions,
  isTrial,
}) {
  const iconsSize = {
    amex: 26,
    masterCard: 26,
    visaCard: 26,
    payPal: 40,
    applePay: 26,
    googlePlay: 26,
    sepa: 38,
    sofort: 16,
  };

  const handleClick = paymentSystem => () => {
    if (paymentSystem === STRIPE)
      return handleSubscriptions(paymentSystem, checkedPlan);
    handlePaymentSystem(paymentSystem);
  };

  return (
    <div className={styles.root}>
      <div className={styles.column}>
        <span className={styles.header}>Select a payment option.</span>

        {isTrial ? (
          <>
            <div className={styles.row}>
              <div className={styles.payment__box_wrapper}>
                <div
                  className={styles.payment__box}
                  onClick={handleClick(STRIPE)}
                >
                  <div className={styles.payment__icons}>
                    <Icon.Amex param={iconsSize.amex} />
                    <Icon.MasterCard param={iconsSize.masterCard} />
                    <Icon.VisaCard param={iconsSize.visaCard} />
                  </div>

                  <span className={styles.label}>Credit Card</span>
                </div>
              </div>
              <div className={styles.payment__box_wrapper}>
                <div
                  className={styles.payment__box}
                  onClick={handleClick(PAY_PAL)}
                >
                  <div className={styles.payment__icons}>
                    <Icon.PayPalIconColorActive param={iconsSize.payPal} />
                  </div>
                  <span className={styles.label}>PayPal</span>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.payment__box_wrapper}>
                <div
                  className={styles.payment__box}
                  onClick={handleClick(STRIPE)}
                >
                  <div className={styles.payment__icons}>
                    <Icon.ApplePay height={iconsSize.applePay} />
                  </div>
                  <span className={styles.label}>Apple Pay</span>
                </div>
              </div>

              <div className={styles.payment__box_wrapper}>
                <div
                  className={styles.payment__box}
                  onClick={handleClick(STRIPE)}
                >
                  <div className={styles.payment__icons}>
                    <Icon.GooglePay height={iconsSize.googlePlay} />
                  </div>
                  <span className={styles.label}>Google Pay</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.row}>
              <div className={styles.payment__box_wrapper}>
                <div
                  className={styles.payment__box}
                  onClick={handleClick(STRIPE)}
                >
                  <div className={styles.payment__icons}>
                    <Icon.Amex param={iconsSize.amex} />
                    <Icon.MasterCard param={iconsSize.masterCard} />
                    <Icon.VisaCard param={iconsSize.visaCard} />
                  </div>

                  <span className={styles.label}>Credit Card</span>
                </div>
              </div>
              <div className={styles.payment__box_wrapper}>
                <div
                  className={styles.payment__box}
                  onClick={handleClick(PAY_PAL)}
                >
                  <div className={styles.payment__icons}>
                    <Icon.PayPalIconColorActive param={iconsSize.payPal} />
                  </div>
                  <span className={styles.label}>PayPal</span>
                </div>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.payment__box_wrapper}>
                <div
                  className={styles.payment__box}
                  onClick={handleClick(STRIPE)}
                >
                  <div className={styles.payment__icons}>
                    <Icon.ApplePay height={iconsSize.applePay} />
                  </div>
                  <span className={styles.label}>Apple Pay</span>
                </div>
              </div>

              <div className={styles.payment__box_wrapper}>
                <div
                  className={styles.payment__box}
                  onClick={handleClick(STRIPE)}
                >
                  <div className={styles.payment__icons}>
                    <Icon.GooglePay height={iconsSize.googlePlay} />
                  </div>
                  <span className={styles.label}>Google Pay</span>
                </div>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.payment__box_wrapper}>
                <div
                  className={styles.payment__box}
                  onClick={handleClick(SEPA)}
                >
                  <div className={styles.payment__icons}>
                    <Icon.SepaIconActive param={iconsSize.sepa} />
                  </div>
                  <span className={styles.label}>SEPA Debit</span>
                </div>
              </div>

              <div className={styles.payment__box_wrapper}>
                <div
                  className={styles.payment__box}
                  onClick={handleClick(SOFORT)}
                >
                  <div className={styles.payment__icons}>
                    <Icon.Sofort height={iconsSize.sofort} />
                  </div>
                  <span className={styles.label}>Klarna</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MobilePaymentMethodsSelect;
