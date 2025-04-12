import {
  DEFAULT_PLAN_FACTOR,
  DRAINT_PROCESSING,
  FIXED_FACTOR,
  PAYOUT_PROCESSING,
  TO_CENT,
} from 'constants/artwork';
import { plansMonthly, plansYearly } from 'views/website/pricing/mockPricing';

import { TEST_PLAN } from 'constants/global';

export const useEarningsFee = () => {
  return (price, planId) => {
    if (price && planId) {
      const plans = [...plansMonthly, ...plansYearly];
      const paidFee = plans.find(
        plan => plan.id === planId || plan.trialId === planId
      );
      const freeFee = plans.find(plan => plan.name === TEST_PLAN);
      const planFee =
        (paidFee && paidFee.factor) ||
        (freeFee && freeFee.factor) ||
        DEFAULT_PLAN_FACTOR;
      const draintFee = (Number(price * planFee) * TO_CENT) / TO_CENT;
      const processingDraintFee =
        (Number(draintFee * DRAINT_PROCESSING) * TO_CENT) / TO_CENT;
      const processingPayoutFee =
        (Number((price - draintFee - processingDraintFee) * PAYOUT_PROCESSING) *
          TO_CENT) /
        TO_CENT;
      const processingFee = Number(
        processingDraintFee + processingPayoutFee
      ).toFixed(FIXED_FACTOR);

      return Number(price - draintFee - processingFee).toFixed(FIXED_FACTOR);
    }
  };
};
