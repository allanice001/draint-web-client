import {
  CLOSE_SNACKBAR,
  GET_ARTWORKS_ERROR,
  GET_ARTWORKS_SUCCESS,
  SAVE_ARTWORKS_PAGE_STATE,
  SET_ARTWORKS_DATE_FILTER,
  SET_ARTWORKS_FILTER,
  SET_ARTWORKS_LOADING,
  SET_ARTWORKS_PAGE,
  SET_ARTWORKS_STATE_FROM_COOKIES,
  UPDATE_ARTWORK_STATUS_ERROR,
  UPDATE_ARTWORK_STATUS_SUCCESS,
} from 'constants/redux/masterArtworks';
import { STATUS_CHANGED_TO } from 'constants/master/artworks';
import axios from 'dataLayer/axiosInstanceMaster';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { getArtworkFilterParameters } from 'services/get-master-filter-parameters';
import { recoverArtwork } from 'redux/artwork/actions/artworkActions';
import { updateArtworkVerificationRequest } from 'dataLayer/master/update-artwork-verification-request';

export const setLoading = () => ({
  type: SET_ARTWORKS_LOADING,
});

export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});

export const setStateFromCookies = payload => ({
  type: SET_ARTWORKS_STATE_FROM_COOKIES,
  payload,
});

export const getArtworksSuccess = payload => ({
  type: GET_ARTWORKS_SUCCESS,
  payload,
});

export const getArtworksError = error => ({
  type: GET_ARTWORKS_ERROR,
  payload: error,
});

export const setArtworksPage = payload => ({
  type: SET_ARTWORKS_PAGE,
  payload,
});

export const savePageState = (type, number) => ({
  type: SAVE_ARTWORKS_PAGE_STATE,
  payload: { type, number },
});

export const setFilter = (type, filter) => ({
  type: SET_ARTWORKS_FILTER,
  payload: { [type]: filter },
});

export const setDateFilter = date => ({
  type: SET_ARTWORKS_DATE_FILTER,
  payload: { date },
});

export const updateArtworkStatusSuccess = payload => ({
  type: UPDATE_ARTWORK_STATUS_SUCCESS,
  payload,
});

export const updateArtworkStatusError = error => ({
  type: UPDATE_ARTWORK_STATUS_ERROR,
  payload: error,
});

export const getArtworks = params => dispatch => {
  dispatch(setLoading());
  axios
    .get('/api/master/artworks', params && { params })
    .then(({ data }) =>
      dispatch(
        getArtworksSuccess({
          currentArtworks: data.artworks,
          totalArtworks: data.totalArtworks,
          totalAccounts: data.totalAccounts,
          totalPages: data.totalPages,
        })
      )
    )
    .catch(error => dispatch(displayMessage(error.message, 'error')));
};

export const pageChange = params => dispatch => {
  dispatch(setArtworksPage(params.page));
  const {
    filter,
    subscriptionFilter,
    verifiedFilter,
    alternateFilter,
  } = params;
  const filters = [filter, subscriptionFilter, verifiedFilter, alternateFilter];
  const activeFilters = filters.filter(item => item !== '');
  const checkActiveFilter = () => {
    if (activeFilters.length === 1) return activeFilters[0];
    if (activeFilters.length === 0) return 'all';
    return false;
  };
  const activeFilter = checkActiveFilter();
  if (activeFilter) dispatch(savePageState(activeFilter, params.page));
  dispatch(getArtworks(params));
};

export const updateArtworkStatus = (artworkId, status, artist_id) => async (
  dispatch,
  getState
) => {
  const { currentArtworks } = getState().master.approvalArtworks;

  updateArtworkVerificationRequest(status, artworkId, artist_id)
    .then(() => {
      const updated = currentArtworks.map(artwork => {
        if (artwork.id === artworkId) {
          return { ...artwork, verification: status };
        }

        return artwork;
      });

      dispatch(getArtworksSuccess({ currentArtworks: updated }));
    })
    .then(() => dispatch(displayMessage(`${STATUS_CHANGED_TO} ${status}`)))
    .catch(error => dispatch(errorMessageHandler(error)));
};

export const recoverDeletedArtwork = (artworkId, accountId) => dispatch => {
  dispatch(recoverArtwork({ artworkId, accountId, isMaster: true }));
};

export const setInitialFilter = initState => dispatch => {
  if (initState) {
    const parameters = getArtworkFilterParameters(initState);
    dispatch(setStateFromCookies(initState));
    dispatch(getArtworks(parameters));
  } else {
    dispatch(getArtworks());
  }
};
