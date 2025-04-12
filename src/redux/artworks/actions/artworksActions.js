import {
  GET_PUBLIC_ARTWORKS_STATE_FROM_COOKIES,
  GET_PUBLIC_ARTWORKS_SUCCESS,
  RESET,
  SET_PUBLIC_ARTWORKS_CHECKED,
  SET_PUBLIC_ARTWORKS_LOADING,
  SET_PUBLIC_ARTWORKS_PAGE,
  SET_PUBLIC_ARTWORKS_SEARCH,
} from '../../../constants/redux/publicArtworks';

import axios from '../../../dataLayer/axiosInstance';
import displayMessage from '../../global/notiifcation/actions/displayMessage';

export const setLoading = () => ({
  type: SET_PUBLIC_ARTWORKS_LOADING,
});

export const setChecked = () => ({
  type: SET_PUBLIC_ARTWORKS_CHECKED,
});

export const setPage = payload => ({
  type: SET_PUBLIC_ARTWORKS_PAGE,
  payload,
});

export const setSearch = payload => ({
  type: SET_PUBLIC_ARTWORKS_SEARCH,
  payload,
});

export const getPublicArtworkSuccess = payload => ({
  type: GET_PUBLIC_ARTWORKS_SUCCESS,
  payload,
});

export const setStateFromCookies = payload => ({
  type: GET_PUBLIC_ARTWORKS_STATE_FROM_COOKIES,
  payload,
});

export const reset = () => ({
  type: RESET,
});

export const getPublicArtworks = (
  page = 1,
  country = '',
  hashtag = '',
  style = '',
  medium = '',
  surface = '',
  title = ''
) => async dispatch => {
  dispatch(setLoading());
  await axios
    .get('/api/artworks/all', {
      params: {
        page,
        country,
        hashtag,
        style,
        medium,
        surface,
        title,
      },
    })
    .then(res =>
      dispatch(
        getPublicArtworkSuccess({
          currentArtworks: res.data.searchResult,
          totalPages: res.data.totalPages,
          totalCountries: res.data.totalCountries,
          totalArtists: res.data.totalArtists,
          totalArtworks: res.data.totalArtworks,
          countries: res.data.countries,
        })
      )
    )
    .catch(err => {
      dispatch(displayMessage(err.message, 'error'));
      dispatch(setLoading());
    });
};

export const getMorePublicArtworks = (
  currentArtworks,
  page = 1,
  country = '',
  hashtag = '',
  style = '',
  medium = '',
  surface = '',
  title = ''
) => async dispatch => {
  dispatch(setLoading());
  await axios
    .get('/api/artworks/all', {
      params: {
        page,
        country,
        hashtag,
        style,
        medium,
        surface,
        title,
      },
    })
    .then(res =>
      dispatch(
        getPublicArtworkSuccess({
          currentArtworks: [...currentArtworks, ...res.data.searchResult],
          totalPages: res.data.totalPages,
          totalCountries: res.data.totalCountries,
          totalArtists: res.data.totalArtists,
          totalArtworks: res.data.totalArtworks,
          countries: res.data.countries,
        })
      )
    )
    .catch(err => {
      dispatch(displayMessage(err.message, 'error'));
      dispatch(setLoading());
    });
};
export const getFirstArtworks = artworks => async dispatch => {
  const newArray = artworks.slice(0, 8);
  dispatch(
    getPublicArtworkSuccess({
      currentArtworks: newArray,
      allCurrentPage: 1,
    })
  );
};
