import { ALL_PLANS, MONTHLY, TEST } from 'constants/components/pricing';
import { features, plansMonthly, plansYearly } from './mockPricing';

export const togglePlansList = (period = MONTHLY) => {
  const condition = period === '' ? MONTHLY : period;

  if (condition === MONTHLY) return plansMonthly;

  if (condition === ALL_PLANS) {
    return [...plansMonthly.slice(1), ...plansYearly.slice(1)];
  }

  return plansYearly;
};

export const toggleFeaturesList = (period = MONTHLY) => {
  const condition = period === '' ? MONTHLY : period;
  if (condition === MONTHLY) {
    return features;
  }
  return features;
};

export const getTestPlan = () => {
  return plansMonthly.filter(plan => plan.name === TEST);
};
