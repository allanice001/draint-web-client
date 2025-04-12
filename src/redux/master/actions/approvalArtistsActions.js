import {
  CLOSE_SNACKBAR,
  GENERATE_CSV_ERROR,
  GENERATE_CSV_SUCCESS,
  GET_ACCOUNTS_ERROR,
  GET_ACCOUNTS_SUCCESS,
  GET_COUNTRIES_SUCCESS,
  SAVE_ACCOUNTS_PAGE_STATE,
  SET_ACCOUNTS_COUNTRY_FILTER,
  SET_ACCOUNTS_DATE_FILTER,
  SET_ACCOUNTS_FILTER,
  SET_ACCOUNTS_LOADING,
  SET_ACCOUNTS_PAGE,
  SET_ACCOUNTS_STATE_FROM_COOKIES,
  SET_CSV_LOADING,
  SET_EMAIL_TAKEN,
  SET_USERNAME_TAKEN,
  UNSET_ACCOUNTS_LOADING,
  UPDATE_ACCOUNT_STATUS_ERROR,
  UPDATE_ACCOUNT_STATUS_SUCCESS,
} from 'constants/redux/masterArtists';

import axios from 'dataLayer/axiosInstance';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getArtistFilterParameters } from 'services/get-master-filter-parameters';

export const setLoading = () => ({
  type: SET_ACCOUNTS_LOADING,
});

export const unsetLoading = () => ({
  type: UNSET_ACCOUNTS_LOADING,
});

export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});

export const setStateFromCookies = payload => ({
  type: SET_ACCOUNTS_STATE_FROM_COOKIES,
  payload,
});

export const getAccountsSuccess = payload => ({
  type: GET_ACCOUNTS_SUCCESS,
  payload,
});

export const getCountriesSuccess = payload => ({
  type: GET_COUNTRIES_SUCCESS,
  payload,
});

export const getAccountsError = error => ({
  type: GET_ACCOUNTS_ERROR,
  payload: error,
});

export const setAccountsPage = payload => ({
  type: SET_ACCOUNTS_PAGE,
  payload,
});

export const savePageState = (type, number) => ({
  type: SAVE_ACCOUNTS_PAGE_STATE,
  payload: { type, number },
});

export const setFilter = (type, filter) => ({
  type: SET_ACCOUNTS_FILTER,
  payload: { [type]: filter },
});

export const setCountryFilter = filter => ({
  type: SET_ACCOUNTS_COUNTRY_FILTER,
  payload: { country: filter },
});

export const setDateFilter = date => ({
  type: SET_ACCOUNTS_DATE_FILTER,
  payload: { date: date },
});

export const updateAccountStatusSuccess = payload => ({
  type: UPDATE_ACCOUNT_STATUS_SUCCESS,
  payload,
});

export const setUsernameTakenActions = payload => ({
  type: SET_USERNAME_TAKEN,
  payload,
});

export const setEmailTakenActions = payload => ({
  type: SET_EMAIL_TAKEN,
  payload,
});

export const updateAccountStatusError = error => ({
  type: UPDATE_ACCOUNT_STATUS_ERROR,
  payload: error,
});

export const setCSVloading = () => ({
  type: SET_CSV_LOADING,
});

export const generateCSVSuccess = payload => ({
  type: GENERATE_CSV_SUCCESS,
  payload,
});

export const generateCSVError = error => ({
  type: GENERATE_CSV_ERROR,
  payload: error,
});

export const getCountries = params => dispatch => {
  axios
    .get('/api/master/artists/countries', params && { params })
    .then(res =>
      dispatch(
        getCountriesSuccess({
          countryList: res.data.countryList,
        })
      )
    )
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const getAccounts = (params, isPageChanged = false) => dispatch => {
  dispatch(setLoading());

  axios
    .get('/api/master/artists', { params })
    .then(res => {
      if (isPageChanged && res.data.artists.length === 0) {
        throw Error('There are no artists according to your request');
      }

      dispatch(
        getAccountsSuccess({
          currentAccounts: res.data.artists,
          totalPages: res.data.totalPages,
          totalAccounts: res.data.totalArtists,
        })
      );

      if (!isPageChanged) getCountries(params)(dispatch);
    })
    .catch(err => {
      dispatch(displayMessage(err.message, 'error'));
      dispatch(unsetLoading(params));
    });
};

export const generateCSV = (params, totalAccounts) => async dispatch => {
  dispatch(setCSVloading());
  if (totalAccounts === 0) {
    dispatch(displayMessage('No users selected'));
    return false;
  }
  const res = await axios.get('/api/master/generate-artists-csv', { params });
  if (res.status !== 200) {
    dispatch(displayMessage(res.data.message, 'error'));
    return false;
  }
  dispatch(displayMessage(res.data.message));
  return true;
};

export const pageChange = params => dispatch => {
  dispatch(setAccountsPage(params.page));
  const { filter, subscriptionFilter, artworkFilter } = params;
  const filters = [filter, subscriptionFilter, artworkFilter];
  const activeFilters = filters.filter(item => item !== '');
  const checkActiveFilter = () => {
    if (activeFilters.length === 1) return activeFilters[0];
    if (activeFilters.length === 0) return 'all';
    return false;
  };
  const activeFilter = checkActiveFilter();
  if (activeFilter) dispatch(savePageState(activeFilter, params.page));
  dispatch(getAccounts(params, true));
};

export const updateAccountStatus = (id, status) => (dispatch, getState) => {
  const { currentAccounts } = getState().master.approvalArtists;
  let url;
  if (status === 'verified') url = '/api/master/artists';
  if (status === 'unverified') url = '/api/master/artists/unverify';
  if (status === 'pending') url = '/api/master/artists/pending';
  axios
    .post(url, { id })
    .then(() => {
      const updated = currentAccounts.map(account => {
        if (account.id === id) return { ...account, verification: status };
        return account;
      });
      dispatch(getAccountsSuccess({ currentAccounts: updated }));
    })
    .then(() => dispatch(displayMessage(`Status changed to '${status}'`)))
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const setInitialFilter = initState => dispatch => {
  if (initState) {
    const parameters = getArtistFilterParameters(initState);
    dispatch(setStateFromCookies(initState));
    dispatch(getAccounts(parameters));
  } else {
    dispatch(getAccounts());
  }
};
