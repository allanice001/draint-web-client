import {
  GET_ARTIST_ACCOUNT_ERROR,
  GET_ARTIST_ACCOUNT_SUCCESS,
  GET_ARTIST_ARTWORKS_PAGINATION,
  GET_ARTIST_ARTWORKS_SUCCESS,
  GET_ARTIST_SERIES_SUCCESS,
  SET_ARTIST_ARTWORK_LOADING,
  SET_ARTIST_AVATAR,
  SET_ARTIST_LOADING_OFF,
  SET_ARTIST_LOADING_ON,
} from 'constants/redux/publicArtistProfile';
import {
  getArtistArtworksRequest,
  getGalleryArtworksRequest,
} from 'dataLayer/artist-profile/requests';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import { SET_USER_ACCOUNT_THEME } from 'constants/redux/user';
import { SWITCH_ROLE_MESSAGES } from 'constants/components/modals';
import axios from 'dataLayer/axiosInstance';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { getSubscribedArtistFull } from 'redux/dashboard/actions/gallaryActions';
import { setUserData } from 'redux/user/account/actions/setUserData';
import updateUserProfileRoleRequest from 'dataLayer/user/update-user-profile-role-request';
import { uploadMediaFileViaSignedUrl } from 'services/media/media.service';
const Analytic = AnalyticHelper.create();

export const setLoadingOn = () => ({
  type: SET_ARTIST_LOADING_ON,
});

export const setArtworkLoading = () => ({
  type: SET_ARTIST_ARTWORK_LOADING,
});

export const setLoadingOff = () => ({
  type: SET_ARTIST_LOADING_OFF,
});

export const getArtistAccountSuccess = payload => ({
  type: GET_ARTIST_ACCOUNT_SUCCESS,
  payload,
});

export const getArtistAccountError = payload => ({
  type: GET_ARTIST_ACCOUNT_ERROR,
  payload,
});

export const getArtistArtworksSuccess = payload => ({
  type: GET_ARTIST_ARTWORKS_SUCCESS,
  payload,
});

export const getArtistArtworksPagination = payload => ({
  type: GET_ARTIST_ARTWORKS_PAGINATION,
  payload,
});

export const getArtistSeriesSuccess = payload => ({
  type: GET_ARTIST_SERIES_SUCCESS,
  payload,
});

export const setUserAccountTheme = payload => ({
  type: SET_USER_ACCOUNT_THEME,
  payload,
});

export const setArtistAvatar = payload => ({
  type: SET_ARTIST_AVATAR,
  payload,
});

export const getArtistAccount = param => async dispatch => {
  dispatch(setLoadingOn());
  await axios
    .get(`/api/artist/theme/username/${param}`)
    .then(res => {
      dispatch(getArtistAccountSuccess(res.data));
      dispatch(setLoadingOff());
    })
    .catch(() => {
      dispatch(getArtistAccountError());
      dispatch(setLoadingOff());
    });
};

export const updateArtistAccount = (param, id, account) => dispatch => {
  axios
    .put('/api/dashboard/account', { updates: { ...param, accountId: id } })
    .then(res => dispatch(displayMessage(res.data.message)))
    .then(() => {
      const updated = { ...account, ...param };
      dispatch(getArtistAccountSuccess(updated));
    })
    .catch(err => {
      dispatch(displayMessage(err.message, 'error'));
    });
};

export const isEmptyOrSpaces = text => () => {
  const check = text === null || text.match(/^ *$/) !== null;

  if (check) return '';

  return text;
};

export const getArtistArtworks = param => dispatch => {
  getArtistArtworksRequest(param)
    .then(({ data }) => {
      dispatch(getArtistArtworksSuccess(data.artistdata));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export const createSubscriptions = (
  artistId,
  collectorId,
  email
) => dispatch => {
  axios
    .post(`/api/personal-subscriptions`, { artistId, collectorId, email })
    .then(res => {
      if (collectorId) {
        dispatch(getSubscribedArtistFull());
      }
      dispatch(displayMessage(res.data.message));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export const changeRoleAction = params => dispatch => {
  updateUserProfileRoleRequest(params)
    .then(({ data: { account } }) => {
      dispatch(setUserData(account));
      dispatch(displayMessage(SWITCH_ROLE_MESSAGES));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export const getArtistSeries = param => dispatch => {
  axios
    .get(`/api/artworks/series?username=${param}`)
    .then(res => {
      dispatch(getArtistSeriesSuccess(res.data.artistSeries));
    })
    .catch(err => {
      dispatch(displayMessage(err.message, 'error'));
    });
};

export const createSeries = (param, series) => async dispatch => {
  return axios
    .post('/api/artworks/series', param)
    .then(res => {
      dispatch(getArtistSeriesSuccess([...series, res.data.newSeries]));
      return res.data.newSeries.id;
    })
    .catch(err => {
      dispatch(displayMessage(err.message, 'error'));
    });
};

export const deleteSeries = (data, series) => async dispatch => {
  axios
    .delete('/api/artworks/series', { data })
    .then(() => {
      const newSeries = series.filter(el => el.id !== data.id);
      dispatch(getArtistSeriesSuccess(newSeries));
    })
    .catch(err => {
      dispatch(displayMessage(err.message, 'error'));
    });
};

export const updateSeries = (data, series) => async dispatch => {
  axios
    .put('/api/artworks/series', data)
    .then(() => {
      const newSeries = series.map(el =>
        el.id === data.id ? { ...el, name: data.name } : el
      );
      dispatch(getArtistSeriesSuccess(newSeries));
    })
    .catch(err => {
      dispatch(displayMessage(err.message, 'error'));
    });
};

export const addToSeries = data => dispatch => {
  axios
    .post('/api/artworks/add-to-series', data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      dispatch(displayMessage(err.message, 'error'));
    });
};

export const removeFromSeries = data => dispatch => {
  axios
    .delete('/api/artworks/remove-from-series', { data })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      dispatch(displayMessage(err.message, 'error'));
    });
};

export const artworksInitialRequest = param => dispatch => {
  dispatch(setArtworkLoading());
  dispatch(getArtistArtworks(param));
  dispatch(getArtistSeries(param));
  dispatch(setArtworkLoading());
};

export const artworksGalleryRequest = (userName, page = 1, pageSize = 6) => (
  dispatch,
  getState
) => {
  const state = getState();
  const { id: accountId } = state.user.account;

  dispatch(setArtworkLoading());
  getGalleryArtworksRequest(userName, page, pageSize, accountId)
    .then(({ data }) => {
      dispatch(getArtistArtworksSuccess(data.artworks));
      dispatch(getArtistArtworksPagination(data.pagination));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
  dispatch(getArtistSeries(userName));
  dispatch(setArtworkLoading());
};

export const changeArtworkStatus = (
  data,
  status,
  artworks,
  artistId
) => dispatch => {
  let url;
  if (status === 'verified') url = '/api/master/artworks';
  if (status === 'unverified') url = '/api/master/artworks/unverify';
  if (status === 'pending') url = '/api/master/artworks/pending';
  axios
    .post(url, { id: data, artistId })
    .then(() => {
      const updated = artworks.map(artwork => {
        if (artwork.id === data) artwork.verification = status;
        return artwork;
      });
      dispatch(getArtistArtworksSuccess(updated));
    })
    .then(() => dispatch(displayMessage(`Status changed to '${status}'`)))
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const changeArtistStatus = (data, status, account) => dispatch => {
  let url;
  if (status === 'verified') url = '/api/master/artists';
  if (status === 'unverified') url = '/api/master/artists/unverify';
  if (status === 'pending') url = '/api/master/artists/pending';
  axios
    .post(url, { id: data })
    .then(() => {
      account['artistVerification'] = status;
      dispatch(getArtistAccountSuccess(account));
    })
    .then(() =>
      dispatch(
        displayMessage(`Status of ${account.username} changed to '${status}'`)
      )
    )
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const uploadArtistAvatar = (
  imageFile,
  artist,
  owner,
  isRotate,
  isMaster,
  isEditorRole
) => async dispatch => {
  axios
    .post('/api/artist/upload/profile-image', {
      artist,
      isRotate,
      isMaster,
      isEditorRole,
      mimeType: imageFile.type,
    })
    .catch(({ message, response }) => {
      dispatch(displayMessage(response?.data?.message || message, 'error'));
    })
    .then(async ({ data }) => {
      await uploadMediaFileViaSignedUrl(imageFile, data.presignedUrl);
      dispatch(setArtistAvatar(data.publicUrl));
      if (owner) {
        dispatch(setUserAccountTheme(data.publicUrl));
      }

      return { data };
    })
    .then(({ data }) => {
      dispatch(displayMessage(data.message));
      Analytic.createEvent('ProfileImageChanged');
    })
    .catch(error => dispatch(displayMessage(error.message, 'error')));
};

export const uploadArtistArtwork = (data, param) => (dispatch, getState) => {
  const state = getState();
  if (state.user.account.permission === 'master') {
    data.append('account_id', state.artist.currentArtist.account.id);
  }
  dispatch(setArtworkLoading());
  axios
    .post('/api/artwork/upload/file', data, { timeout: 15000 })
    .then(() => dispatch(displayMessage('Artwork successfully uploaded')))
    .then(() => dispatch(getArtistArtworks(param)))
    .then(() => dispatch(setArtworkLoading()))
    .catch(err => {
      dispatch(displayMessage(err.message, 'error'));
      dispatch(setArtworkLoading());
    });
};

export const updateBiography = (profile_id, account, biography) => dispatch => {
  axios
    .put('/api/dashboard/biography', {
      biography: biography ? biography.trim() : '',
      profile_id,
    })
    .then(() => {
      const updated = { ...account, biography };
      dispatch(getArtistAccountSuccess(updated));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const createUserData = (profile_id, type, form, account) => dispatch => {
  axios
    .post('/api/dashboard/personal-data', { type, form, profile_id })
    .then(res => {
      const updated = {
        ...account,
        [type]: [...account[type], { ...form, id: res.data.newId }],
      };
      dispatch(getArtistAccountSuccess(updated));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const deleteUserData = (type, id, account) => dispatch => {
  axios
    .delete('/api/dashboard/personal-data', { data: { type, id } })
    .then(() => {
      const updated = {
        ...account,
        [type]: account[type].filter(el => el.id !== id),
      };
      dispatch(getArtistAccountSuccess(updated));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};
