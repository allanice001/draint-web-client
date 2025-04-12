import * as Button from 'components/shared/button';
import {
  PRICING_HEADER_CANCEL_BUTTON_NAME,
  PRICING_HEADER_SELECTED_PLAN_TITLE,
  PRICING_HEADER_TITLE,
  PRICING_HEADER_WITHOUT_PLAN,
} from 'constants/components/pricing';
import React from 'react';
import styles from './pricing-header.module.scss';
import { usePricing } from 'hooks/use-pricing';

export function PricingHeader() {
  const {
    isOnTestPlan,
    getCurrentPlanName,
    handleUnsubscribe,
    pricing,
  } = usePricing();
  const { load } = pricing;

  return (
    <header className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>{PRICING_HEADER_TITLE}</h1>
        <p className={styles.subtitle}>
          {PRICING_HEADER_SELECTED_PLAN_TITLE}
          <b>
            {isOnTestPlan ? PRICING_HEADER_WITHOUT_PLAN : getCurrentPlanName()}
          </b>
        </p>
      </div>

      <div className={styles.actions}>
        <Button.Primary
          className={styles.button}
          sm
          onClick={handleUnsubscribe}
          disabled={isOnTestPlan || load}
        >
          {PRICING_HEADER_CANCEL_BUTTON_NAME}
        </Button.Primary>
      </div>
    </header>
  );
}
