import {
  FETCH_REQUESTED_PAYOUTS_SUCCESS,
  SET_FETCH,
  SET_PAGE,
} from 'constants/redux/master-payouts';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import {
  changePayoutStatusRequest,
  getRequestedPayoutsRequest,
} from 'dataLayer/master/payouts-requests';

export const handleSetPage = payload => ({
  type: SET_PAGE,
  payload,
});

export const payoutsSuccess = payload => ({
  type: FETCH_REQUESTED_PAYOUTS_SUCCESS,
  payload,
});

export const setFetch = payload => ({
  type: SET_FETCH,
  payload,
});

export const getRequestedPayouts = page => dispatch => {
  getRequestedPayoutsRequest(page)
    .then(response => {
      dispatch(payoutsSuccess(response.data));
      dispatch(setFetch(false));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(setFetch(false));
    });
};

export const handleChangePayoutStatus = (
  requestedPayoutId,
  status,
  page
) => dispatch => {
  changePayoutStatusRequest(requestedPayoutId, status)
    .then(() => {
      dispatch(getRequestedPayouts(page));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};
