import ArrowIcon from 'components/icons/arrow';
import React from 'react';
import cx from 'classnames';
import styles from './checkout-header.module.scss';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const steps = [
  // { step: 0, label: 'Personal info' },
  { step: 1, label: 'Shipping details' },
  { step: 2, label: 'Payment details' },
  { step: 3, label: 'Confirmation' },
];

export function CheckoutHeader({ activeStep }) {
  const isDesktop = useMediaQuery('(min-width: 960px)');

  return (
    <section className={styles.header_wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>
          {activeStep === 2 ? 'Order summary' : 'Checkout'}
        </div>
        <div className={styles.progress}>
          {steps.map((s, index) => (
            <div
              style={{
                maxWidth: !isDesktop ? `calc(100% / ${steps.length})` : 'none',
              }}
              key={index}
              className={cx(styles.step, {
                [styles.active]: s.step === activeStep,
                [styles.last]: index === steps.length - 1,
              })}
            >
              <span className={styles.name} title={s.label}>
                {s.label}
              </span>

              {s.step !== steps.length && (
                <ArrowIcon className={styles.arrow} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.mobile_header}>
        <div className={styles.mobile_title}>
          {activeStep === 2 ? 'Order summary' : 'Checkout'}
        </div>
        <div className={styles.sub_stepper}>
          {steps.map((s, index) => (
            <div
              key={index}
              className={cx(styles.step, {
                [styles.active]: s.step === activeStep,
              })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
