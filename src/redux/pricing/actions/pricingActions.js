import {
  ALL_IN_PLAN_NAME,
  BASIC_PLAN_NAME,
  CANCEL_MESSAGE,
  PAY_PAL,
  STRIPE,
} from 'constants/components/pricing';
import {
  CHANGE_PAYMENT_SYSTEM,
  CHANGE_SOFORT_COUNTRY_CODE,
  CHANGE_USER_COUNTRY,
  CLOSE_PLAN_INFO_MODAL,
  CLOSE_SUBSCRIPTION_MODAL,
  GET_CHECKED_PLAN,
  GET_PAYPAL_EMAIL,
  HANDLE_SET_CHECKED_PLAN,
  OPEN_PLAN_INFO_MODAL,
  OPEN_SUBSCRIPTION_MODAL,
  SET_LOADING_FALSE,
  SET_LOADING_STATE,
  SET_LOADING_TRUE,
  SET_PLAN_PERIOD,
  SET_SELECTED_PLAN,
  SET_SELECTED_PLAN_ERROR,
  SET_SUBSCRIPTION_MODAL,
  SET_SUBSCRIPTION_MODAL_TEXT,
  SET_TRIAL,
  SET_TRIAL_MONTH_ALL_IN,
  SET_TRIAL_MONTH_BASIC,
} from 'constants/redux/pricing';

import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import axios from 'dataLayer/axiosInstanceMaster';
import deleteUserData from 'redux/user/account/actions/deleteUserData';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';

export const handleTrialPlan = payload => ({
  type: SET_TRIAL,
  payload,
});

export const handleTrialMonthlyBasicPlan = payload => ({
  type: SET_TRIAL_MONTH_BASIC,
  payload,
});

export const handleTrialMonthlyAllInPlan = payload => ({
  type: SET_TRIAL_MONTH_ALL_IN,
  payload,
});

export const handleSetCheckedPlan = payload => ({
  type: HANDLE_SET_CHECKED_PLAN,
  payload,
});

export const setPlanPeriod = payload => ({
  type: SET_PLAN_PERIOD,
  payload,
});

export const handleOpenSubscribeModal = payload => ({
  type: OPEN_SUBSCRIPTION_MODAL,
  payload,
});

export const handlePlanInfoModal = payload => ({
  type: OPEN_PLAN_INFO_MODAL,
  payload,
});
export const handleCloseInfoModal = () => ({
  type: CLOSE_PLAN_INFO_MODAL,
});

export const handleCloseSubscribeModal = () => ({
  type: CLOSE_SUBSCRIPTION_MODAL,
});

export const handlePaymentSystem = payload => ({
  type: CHANGE_PAYMENT_SYSTEM,
  payload,
});

export const handleChangeUserCountry = payload => ({
  type: CHANGE_USER_COUNTRY,
  payload: payload.target.value,
});

export const handleChangeSofortCountryCode = payload => ({
  type: CHANGE_SOFORT_COUNTRY_CODE,
  payload: payload.target.value,
});

export const setLoadingTrue = () => ({
  type: SET_LOADING_TRUE,
});

export const setLoadingFalse = () => ({
  type: SET_LOADING_FALSE,
});

export const setLoadingState = loading => ({
  type: SET_LOADING_STATE,
  payload: loading,
});

export const setSubscriptionCancelModal = () => ({
  type: SET_SUBSCRIPTION_MODAL,
});

export const setSubscriptionCancelModalText = payload => ({
  type: SET_SUBSCRIPTION_MODAL_TEXT,
  payload,
});

export const setSelectedPlan = selectedPlan => ({
  type: SET_SELECTED_PLAN,
  payload: selectedPlan,
});

export const setSelectedPlanError = isError => dispatch => {
  if (isError) {
    dispatch(
      displayMessage('Select Subscription plan to finish SignUp', 'warning')
    );
  }

  dispatch({
    type: SET_SELECTED_PLAN_ERROR,
    payload: isError,
  });
};

export const setTrialPlan = (checked, paymentSystem) => dispatch => {
  if (checked) {
    if (paymentSystem === STRIPE || paymentSystem === PAY_PAL) {
      return dispatch(handleTrialPlan({ checked, paymentSystem }));
    }

    return dispatch(handleTrialPlan({ checked, paymentSystem: '' }));
  }

  return dispatch(handleTrialPlan({ checked, paymentSystem: paymentSystem }));
};

export const handlePreselectedTrialPlan = selectedPlan => (
  dispatch,
  getState
) => {
  const { isBasicTrial, isAllInTrial } = getState().pricing;

  if (selectedPlan.name === BASIC_PLAN_NAME && isBasicTrial) {
    dispatch(setTrialPlan(isBasicTrial, ''));
  }

  if (selectedPlan.name === ALL_IN_PLAN_NAME && isAllInTrial) {
    dispatch(setTrialPlan(isAllInTrial, ''));
  }
};

export const cancelSubscriptionProcess = (
  planPeriod,
  planName,
  history
) => dispatch => {
  if (!planPeriod && !planName) {
    return dispatch(deleteUserData());
  }

  dispatch(displayMessage(`${CANCEL_MESSAGE}`, 'warning'));

  return history.push(PROFILE_GALLERY);
};

export const getPayPalEmail = payload => ({
  type: GET_PAYPAL_EMAIL,
  payload,
});

export const getCheckedPlan = payload => ({
  type: GET_CHECKED_PLAN,
  payload,
});

export const getModalAttachments = title => dispatch => {
  axios
    .get('/api/master/info-modal', { params: { title: title } })
    .then(res => dispatch(handlePlanInfoModal(res.data)))
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};
