import {
  GET_OFFERS_ERROR,
  GET_OFFERS_SUCCESS,
  RESET_OFFERS_FILTER,
  SET_OFFERS_FILTER,
  SET_OFFERS_LOADING,
  SET_OFFER_EXPANDED,
} from 'constants/redux/master-offers';

import { CLOSE_SNACKBAR } from 'constants/redux/global/messages';
import axios from 'dataLayer/axiosInstanceMaster';

export const setOffersLoading = () => ({
  type: SET_OFFERS_LOADING,
});

export const setExpandedOfferId = offerId => ({
  type: SET_OFFER_EXPANDED,
  payload: offerId,
});

export const closeOffersSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});

export const getOffersSuccess = payload => ({
  type: GET_OFFERS_SUCCESS,
  payload,
});

export const getOffersError = error => ({
  type: GET_OFFERS_ERROR,
  payload: error,
});

export const setOffersFilter = payload => ({
  type: SET_OFFERS_FILTER,
  payload,
});

export const resetOffersFilters = () => ({
  type: RESET_OFFERS_FILTER,
});

export const applyOfferFilters = () => (dispatch, getState) => {
  const {
    master: { offers },
  } = getState();

  dispatch(getOffers(offers.filters));
};

export const getOffers = (
  { search = '', status = '', buyer = '', seller = '' } = {
    search: '',
    status: '',
    buyer: '',
    seller: '',
  }
) => dispatch => {
  dispatch(setOffersLoading());

  axios
    .get('/api/master/offers', {
      params: {
        search,
        status,
        buyer,
        seller,
      },
    })
    .then(({ data }) => dispatch(getOffersSuccess(data)))
    .catch(error => dispatch(getOffersError(error.message)));
};
