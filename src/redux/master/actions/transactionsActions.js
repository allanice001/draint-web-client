import {
  CLOSE_SNACKBAR,
  GET_CHARGES_ERROR,
  GET_CHARGES_SUCCESS,
  SET_CURRENT_CHARGES_SUCCESS,
  SET_TRANSACTIONS_LOADING,
  SET_TRANSACTIONS_MONTH,
  SET_TRANSACTIONS_YEAR,
} from 'constants/redux/masterTransactions';

import axios from 'dataLayer/axiosInstanceMaster';

export const getChargesSuccess = payload => ({
  type: GET_CHARGES_SUCCESS,
  payload,
});

export const getChargesError = error => ({
  type: GET_CHARGES_ERROR,
  payload: error,
});

export const setLoading = () => ({
  type: SET_TRANSACTIONS_LOADING,
});

export const changeMonth = month => ({
  type: SET_TRANSACTIONS_MONTH,
  payload: month,
});

export const changeYear = year => ({
  type: SET_TRANSACTIONS_YEAR,
  payload: year,
});

export const closeTransactionsSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});

export const setCurrentCharges = payload => ({
  type: SET_CURRENT_CHARGES_SUCCESS,
  payload,
});

export const setChargesPage = (charges, page) => dispatch => {
  const chargesByPages = [];
  for (let i = 0; i < charges.length; i += 30) {
    chargesByPages.push(charges.slice(i, i + 30));
  }
  dispatch(
    setCurrentCharges({
      charges: chargesByPages[page - 1],
      totalPages: chargesByPages.length,
      page,
    })
  );
};

export const getCharges = (month, year) => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/master/transacton-list?month=${month}&year=${year}`, {
      timeout: 20000,
    })
    .then(res => {
      dispatch(getChargesSuccess(res.data.charges));
      dispatch(setChargesPage(res.data.charges, 1));
    })
    .catch(err => dispatch(getChargesError(err.message)));
};
