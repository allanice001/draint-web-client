import {
  ALL_IN_PLAN_NAME,
  ALL_IN_TRIAL_PLAN_NAME,
  BASIC_PLAN_NAME,
  BASIC_TRIAL_PLAN_NAME,
  CANCEL_MODAL_MESSAGE,
  MONTH,
  MONTHLY,
  TEST,
  YEAR,
  YEARLY,
} from 'constants/components/pricing';
import {
  handleOpenSubscribeModal,
  setSubscriptionCancelModal,
  setSubscriptionCancelModalText,
} from 'redux/pricing/actions/pricingActions';

import { ARTWORKS_UPLOAD_LIMIT_ON_TEST_PLAN } from 'constants/global';

function getSubscriptionPriority(name, period, isTrialPlan) {
  if (name === TEST) return 1;

  if (period === MONTH || period === MONTHLY) {
    if (name === BASIC_TRIAL_PLAN_NAME && isTrialPlan) return 2;
    if (name === ALL_IN_TRIAL_PLAN_NAME && isTrialPlan) return 3;
    if (name === BASIC_TRIAL_PLAN_NAME && !isTrialPlan) return 4;
    if (name === ALL_IN_TRIAL_PLAN_NAME && !isTrialPlan) return 5;
    if (name === BASIC_PLAN_NAME) return 4;
    if (name === ALL_IN_PLAN_NAME) return 5;
  }

  if (period === YEAR || period === YEARLY) {
    if (name === BASIC_PLAN_NAME) return 6;
    if (name === ALL_IN_PLAN_NAME) return 7;
  }

  return 0;
}

const checkSubscriptionCancelDate = plan => (dispatch, getState) => {
  const {
    cancelSubscriptionDate: subCancelDate,
    planName,
    planPeriod,
    artworksCount,
    isTrialPlan,
  } = getState().user.account;

  const newPlanPriority = getSubscriptionPriority(
    plan.label,
    plan.period,
    isTrialPlan
  );

  const isDowngrading =
    getSubscriptionPriority(planName, planPeriod) > newPlanPriority;

  if (subCancelDate && isDowngrading && new Date() < new Date(subCancelDate)) {
    dispatch(setSubscriptionCancelModal());
  } else if (
    isDowngrading &&
    newPlanPriority === 1 &&
    artworksCount > ARTWORKS_UPLOAD_LIMIT_ON_TEST_PLAN
  ) {
    dispatch(setSubscriptionCancelModalText(CANCEL_MODAL_MESSAGE));
    dispatch(setSubscriptionCancelModal());
  } else {
    dispatch(handleOpenSubscribeModal(plan));
  }
};

export default checkSubscriptionCancelDate;
