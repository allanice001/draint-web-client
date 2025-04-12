import { BillingHistory } from './billing-history/billing-history';
import { PaymentDetails } from './payment-details/payment-details';
import Plans from 'components/pricing/plans';
import { PricingHeader } from './pricing-header/pricing-header';
import React from 'react';
import { SubscriptionTimeline } from './subscription-timeline/subscription-timeline';
import styles from './pricing.module.scss';

function Pricing({ onlyPrice }) {
  return (
    <section className={styles.root}>
      <div className={`container ${styles.container}`}>
        {onlyPrice ? (
          <Plans />
        ) : (
          <>
            <PricingHeader />
            <SubscriptionTimeline />
            <Plans />
            <PaymentDetails />
            <BillingHistory />
          </>
        )}
      </div>
    </section>
  );
}

export default Pricing;
