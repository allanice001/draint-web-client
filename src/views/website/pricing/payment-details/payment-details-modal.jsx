import * as Button from 'components/shared/button';
import * as CONSTANTS from 'constants/components/pricing';
import DefaultModal from 'components/basic-modal/basic-modal';
import React from 'react';
import StripePmCardForm from 'components/materialForm/stripeForm/stripe-pm-card-form';
import StripePmSepaDebitForm from 'components/materialForm/stripeForm/stripe-pm-sepa-debit-form';
import styles from './payment-details.module.scss';
import { useBillingPM } from 'hooks/use-billing-PM';

export function PaymentDetailsModal() {
  const {
    closePaymentModal,
    isOpen,
    paymentMethod,
    formType,
    updating,
  } = useBillingPM();
  const { type } = paymentMethod;

  return (
    <DefaultModal
      customWidth={styles.modal_width}
      footerClassName={styles.modal_footer}
      footer={
        <div className={styles.modal}>
          <div className={styles.footer}>
            <Button.Primary
              className={styles.button}
              type={CONSTANTS.BUTTON_SUBMIT}
              form={formType}
              sm
              disabled={updating}
            >
              {CONSTANTS.PM_MODAL_CONFIRM_BTN}
            </Button.Primary>
          </div>
        </div>
      }
      handleClose={closePaymentModal}
      isOpen={isOpen}
      title={CONSTANTS.PM_MODAL_TITLE}
    >
      <section className={styles.modal_content}>
        {type === CONSTANTS.CARD_PM && <StripePmCardForm />}
        {type === CONSTANTS.DEBIT_PM && <StripePmSepaDebitForm />}
      </section>
    </DefaultModal>
  );
}
