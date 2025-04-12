import * as ACTION from './billing-constants';
import {
  changeDefaultPMRequest,
  fetchBillingHistory,
  fetchBillingMethod,
  fetchBillingTimeLine,
} from 'dataLayer/billing/fetch-bulling-history';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';

const setLoading = payload => {
  return {
    type: ACTION.BILLING_SET_LOADING,
    payload,
  };
};

export const setUpdating = payload => {
  return {
    type: ACTION.BILLING_SET_UPDATING,
    payload,
  };
};

const fetchDataSuccess = payload => {
  return {
    type: ACTION.BILLING_FETCH_DATA_SUCCESS,
    payload,
  };
};

const updateDataSuccess = payload => {
  return {
    type: ACTION.BILLING_UPDATE_DATA_SUCCESS,
    payload,
  };
};

export const openPaymentModal = () => {
  return {
    type: ACTION.OPEN_PAYMENT_MODAL,
  };
};

export const closePaymentModal = () => {
  return {
    type: ACTION.CLOSE_PAYMENT_MODAL,
  };
};

export const fetchBillingHistoryData = (page = 1) => (dispatch, getState) => {
  try {
    const state = getState();
    const { id: accountId } = state.user.account;

    dispatch(setLoading(true));
    fetchBillingHistory({ accountId, page }).then(({ data }) => {
      const { billingHistory, pagination } = data;
      dispatch(fetchDataSuccess({ history: { billingHistory, pagination } }));
    });
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(errorMessageHandler(error));
  }
};

export const fetchBillingTimeLineData = () => (dispatch, getState) => {
  try {
    const state = getState();
    const { id: accountId } = state.user.account;

    dispatch(setLoading(true));
    fetchBillingTimeLine({ accountId }).then(({ data }) => {
      const { timeLineHistory } = data;
      dispatch(fetchDataSuccess({ timeLine: { timeLineHistory } }));
    });
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(errorMessageHandler(error));
  }
};

export const fetchBillingMethodData = () => (dispatch, getState) => {
  try {
    const state = getState();
    const { id: accountId } = state.user.account;

    dispatch(setLoading(true));
    fetchBillingMethod({ accountId }).then(({ data }) => {
      if (data) {
        const { paymentMethod } = data;
        dispatch(fetchDataSuccess({ paymentMethod: paymentMethod }));
      }
    });
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(errorMessageHandler(error));
  }
};

export const handleStripeCreatePM = response => dispatch => {
  if (response.error) {
    dispatch(setUpdating(false));
    return dispatch(errorMessageHandler(response.error));
  }

  dispatch(closePaymentModal());
  return dispatch(handleChangeDefaultPMRequest(response));
};

const handleChangeDefaultPMRequest = paymentMethod => (dispatch, getState) => {
  const state = getState();
  const { id: accountId } = state.user.account;
  dispatch(setUpdating(true));

  changeDefaultPMRequest({ ...paymentMethod, accountId })
    .then(() => {
      const state = getState();
      const { id: accountId } = state.user.account;

      fetchBillingMethod({ accountId }).then(({ data }) => {
        if (data) {
          const { paymentMethod } = data;
          dispatch(updateDataSuccess({ paymentMethod: paymentMethod }));
        }
      });
    })
    .catch(error => {
      dispatch(setUpdating(false));
      dispatch(errorMessageHandler(error));
    });
};
