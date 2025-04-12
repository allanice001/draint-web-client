import {
  GET_FEATURES_CARDS,
  GET_NEW_PUBLIC_ARTISTS_SUCCESS,
  GET_PUBLIC_ARTISTS_STATE_FROM_COOKIES,
  GET_PUBLIC_ARTISTS_SUCCESS,
  SET_NEW_PUBLIC_ARTISTS_LOADING,
  SET_PUBLIC_ARTISTS_CHECKED,
  SET_PUBLIC_ARTISTS_LOADING,
  SET_PUBLIC_ARTISTS_PAGE,
  SET_PUBLIC_ARTISTS_SEARCH,
} from 'constants/redux/publicArtists';

import axios from '../../../dataLayer/axiosInstance';
import displayMessage from '../../global/notiifcation/actions/displayMessage';

export const setLoadingAll = () => ({
  type: SET_PUBLIC_ARTISTS_LOADING,
});

export const setLoadingNew = () => ({
  type: SET_NEW_PUBLIC_ARTISTS_LOADING,
});

export const setChecked = () => ({
  type: SET_PUBLIC_ARTISTS_CHECKED,
});

export const setPage = payload => ({
  type: SET_PUBLIC_ARTISTS_PAGE,
  payload,
});

export const setSearch = payload => ({
  type: SET_PUBLIC_ARTISTS_SEARCH,
  payload,
});

export const getPublicArtistSuccess = payload => ({
  type: GET_PUBLIC_ARTISTS_SUCCESS,
  payload,
});

export const getNewPublicArtistSuccess = payload => ({
  type: GET_NEW_PUBLIC_ARTISTS_SUCCESS,
  payload,
});

export const getFeaturesCards = payload => ({
  type: GET_FEATURES_CARDS,
  payload,
});

export const setStateFromCookies = payload => ({
  type: GET_PUBLIC_ARTISTS_STATE_FROM_COOKIES,
  payload,
});

export const getPublicArtist = (
  // eslint-disable-next-line no-unused-vars
  checked = false,
  name = '',
  page = 1,
  country = [],
  hashtag = ''
) => async dispatch => {
  dispatch(setLoadingAll());
  await axios
    .get('/api/artists/all', {
      params: {
        name,
        page,
        country,
        hashtag,
      },
    })
    .then(res => {
      dispatch(
        getPublicArtistSuccess({
          currentArtists: res.data.searchByNameRes,
          totalPages: res.data.totalPages,
          totalCountries: res.data.totalCountries,
          totalArtists: res.data.totalArtists,
          totalArtworks: res.data.totalArtworks,
          countries: res.data.countries,
        })
      );
      dispatch(setLoadingAll());
    })
    .catch(err => {
      dispatch(displayMessage(err.message, 'error'));
      dispatch(setLoadingAll());
    });
};

export const getNewPublicArtist = (page = 1) => async dispatch => {
  dispatch(setLoadingNew());
  await axios
    .get(`/api/artists/allNew?page=${page}`)
    .then(res => {
      dispatch(
        getNewPublicArtistSuccess({
          newArtists: res.data.newArtistsRes,
          newArtistPages: res.data.totalPages,
        })
      );
      dispatch(setLoadingNew());
    })
    .catch(err => {
      dispatch(displayMessage(err.message, 'error'));
      dispatch(setLoadingNew());
    });
};

export const getLimitedFeaturesCards = () => dispatch => {
  axios
    .get('/api/artists/feature-cards')
    .then(res => {
      dispatch(getFeaturesCards(res.data.cards));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

// export const getMorePublicArtist = (checked = false, name = '', page = 1, currentArtists) => async (dispatch) => {
//   const url = checked ? '/api/artists/artistsWhoSold' : '/api/artists/all';
//   const resType = checked ? 'searchByNameSellers' : 'searchByNameRes';
//   await axios.get(`${url}?name=${name}&page=${page}`)
//     .then(res => dispatch(getPublicArtistSuccess({
//       currentArtists: [...currentArtists, ...res.data[resType]],
//       totalPages: res.data.totalPages,
//       loading: false,
//     })))
//     .catch(err => dispatch(displayMessage(err.message, 'error')));
// };

export const getMorePublicArtist = (
  currentArtists,
  name = '',
  page = 1,
  country = [],
  hashtag = ''
) => async dispatch => {
  dispatch(setLoadingAll());
  const url = '/api/artists/all';
  const resType = 'searchByNameRes';
  await axios
    .get(url, {
      params: {
        name,
        page,
        country,
        hashtag,
      },
    })
    .then(res =>
      dispatch(
        getPublicArtistSuccess({
          currentArtists: [...currentArtists, ...res.data[resType]],
          totalPages: res.data.totalPages,
          loading: false,
        })
      )
    )
    .catch(err => dispatch(displayMessage(err.message, 'error')));
  dispatch(setLoadingAll());
};

export const getMoreNewArtist = (
  currentArtists,
  page = 1
) => async dispatch => {
  dispatch(setLoadingNew());
  await axios
    .get(`/api/artists/allNew?page=${page}`)
    .then(res =>
      dispatch(
        getNewPublicArtistSuccess({
          newArtists: [...currentArtists, ...res.data.newArtistsRes],
          newArtistPages: res.data.totalPages,
          loading: false,
        })
      )
    )
    .catch(err => dispatch(displayMessage(err.message, 'error')));
  dispatch(setLoadingNew());
};

export const getFirstArtists = (artists, type) => async dispatch => {
  if (type === 'new') {
    const newArray = artists.slice(0, 4);
    dispatch(
      getNewPublicArtistSuccess({
        newArtists: newArray,
        newArtistPage: 1,
      })
    );
  } else {
    const newArray = artists.slice(0, 8);
    dispatch(
      getPublicArtistSuccess({
        currentArtists: newArray,
        allCurrentPage: 1,
      })
    );
  }
};
