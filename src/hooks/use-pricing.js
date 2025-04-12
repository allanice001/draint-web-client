import {
  ALL_IN_PLAN_NAME,
  ALL_IN_TRIAL_PLAN_NAME,
  ALL_PLANS,
  BASIC_PLAN_NAME,
  BASIC_TRIAL_PLAN_NAME,
  TEST,
  TRIAL_NAME,
} from 'constants/components/pricing';
import {
  getModalAttachments,
  handleCloseInfoModal,
  handlePreselectedTrialPlan,
  handleTrialMonthlyAllInPlan,
  handleTrialMonthlyBasicPlan,
} from 'redux/pricing/actions/pricingActions';
import {
  getTestPlan,
  toggleFeaturesList,
  togglePlansList,
} from 'views/website/pricing/togleMockData';
import { useDispatch, useSelector } from 'react-redux';
import checkCurrentSubscription from 'redux/pricing/thunks/check-current-subscription';
import checkStripeSession from 'redux/pricing/thunks/check-stripe-session';
import getSubscriptionsList from 'redux/pricing/thunks/checkSubscription';
import setUserCurrentPlan from 'redux/user/account/thunks/set-user-current-plan';

export const usePricing = signUpFinishCallback => {
  const [testPlan] = getTestPlan();
  const plansList = togglePlansList(ALL_PLANS);
  const features = toggleFeaturesList(ALL_PLANS);

  const dispatch = useDispatch();
  const user = useSelector(store => store.user.account);
  const pricing = useSelector(store => store.pricing);
  const infoModalOpen = useSelector(store => store.pricing.infoModalOpen);
  const modalTitle = useSelector(store => store.pricing.modalInfoTitle);
  const modalInfoImg = useSelector(store => store.pricing.modalInfoImg);
  const isAllInTrialChecked = useSelector(store => store.pricing.isAllInTrial);
  const isBasicTrialChecked = useSelector(store => store.pricing.isBasicTrial);
  const modalDescription = useSelector(
    store => store.pricing.modalInfoDescription
  );

  const {
    id: accountId,
    isTrialPlan,
    planName: currentUserPlan,
    planId,
    isHaveBilling,
    subscription,
    cancelSubscriptionDate,
  } = user;

  const isOnTestPlan = currentUserPlan === TEST;

  function getTrial() {
    if (isHaveBilling) {
      return !isHaveBilling;
    }

    if (subscription) {
      return !subscription;
    }

    if (cancelSubscriptionDate) {
      return !cancelSubscriptionDate;
    }

    return true;
  }

  // set true for simulate signUp and turn on trial subscriptions
  // const isSignUp = !!signUpFinishCallback;
  const isSignUp = getTrial();

  function getCurrentPlanName() {
    if (!isTrialPlan && currentUserPlan === ALL_IN_TRIAL_PLAN_NAME) {
      return ALL_IN_PLAN_NAME;
    }

    if (!isTrialPlan && currentUserPlan === BASIC_TRIAL_PLAN_NAME) {
      return BASIC_PLAN_NAME;
    }

    return currentUserPlan;
  }

  function handleUnsubscribe() {
    if (isTrialPlan) {
      return dispatch(checkCurrentSubscription(accountId, testPlan, true));
    }

    // set 3rd parameter true to turn off date checker (test mode)
    return dispatch(checkCurrentSubscription(accountId, testPlan));
  }

  function handleSubscriptionModal(selectedPlan) {
    dispatch(checkCurrentSubscription(accountId, selectedPlan));
    dispatch(handlePreselectedTrialPlan(selectedPlan));
  }

  function findSubscriptionIndex(list) {
    const idIndex = list.findIndex(({ id }) => id === planId);

    if (idIndex === -1) {
      return list.findIndex(({ trialId }) => trialId === planId);
    }

    return idIndex;
  }

  function handleMonthlyTrial(event) {
    const { checked, name } = event.target;

    if (name === `${TRIAL_NAME}${BASIC_PLAN_NAME}`) {
      return dispatch(handleTrialMonthlyBasicPlan(checked));
    }

    return dispatch(handleTrialMonthlyAllInPlan(checked));
  }

  const handleOpenInfoModal = name => {
    dispatch(getModalAttachments(name));
  };

  const closeInfoModal = () => {
    dispatch(handleCloseInfoModal());
  };

  function getMonthlyLabelPlanData(plan) {
    if (
      (isBasicTrialChecked && currentUserPlan === plan.trialName) ||
      currentUserPlan === plan.trialName
    ) {
      return {
        label: plan.trialLabel,
        period: plan.trialPeriod,
      };
    }

    if (isBasicTrialChecked && plan.trialName === BASIC_TRIAL_PLAN_NAME) {
      return {
        label: plan.trialLabel,
        period: plan.trialPeriod,
      };
    }

    if (
      (isAllInTrialChecked && currentUserPlan === plan.trialName) ||
      currentUserPlan === plan.trialName
    ) {
      return {
        label: plan.trialLabel,
        period: plan.trialPeriod,
      };
    }

    if (isAllInTrialChecked && plan.trialName === ALL_IN_TRIAL_PLAN_NAME) {
      return {
        label: plan.trialLabel,
        period: plan.trialPeriod,
      };
    }

    return {
      label: plan.period,
      period: null,
    };
  }

  return {
    user,
    handleUnsubscribe,
    currentUserPlan,
    infoModalOpen,
    isOnTestPlan,
    pricing,
    handleSubscriptionModal,
    findSubscriptionIndex,
    plansList,
    features,
    isSignUp,
    modalTitle,
    modalInfoImg,
    modalDescription,
    getModalAttachments,
    getSubscriptionsList,
    checkStripeSession,
    setUserCurrentPlan,
    handleMonthlyTrial,
    handleOpenInfoModal,
    closeInfoModal,
    getCurrentPlanName,
    getMonthlyLabelPlanData,
  };
};
