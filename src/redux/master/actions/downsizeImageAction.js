import {
  CLOSE_SNACKBAR,
  DOWNSIZE_IMAGE_ERROR,
  DOWNSIZE_IMAGE_SUCCESS,
  GET_DOWNSIZE_ACCOUNTS_ERROR,
  GET_DOWNSIZE_ACCOUNTS_SUCCESS,
  GET_DOWNSIZE_ARTWORKS_ERROR,
  GET_DOWNSIZE_ARTWORKS_SUCCESS,
  SET_DOWNSIZE_ACCOUNTS_PAGE,
  SET_DOWNSIZE_ARTWORKS_PAGE,
  SET_DOWNSIZE_LOADING,
} from 'constants/redux/masterDownsizeImage';

import axios from 'dataLayer/axiosInstanceMaster';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';

export const setLoading = () => ({
  type: SET_DOWNSIZE_LOADING,
});

export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});

export const getAccountsSuccess = payload => ({
  type: GET_DOWNSIZE_ACCOUNTS_SUCCESS,
  payload,
});

export const getAccountsError = error => ({
  type: GET_DOWNSIZE_ACCOUNTS_ERROR,
  payload: error,
});

export const getArtworksSuccess = payload => ({
  type: GET_DOWNSIZE_ARTWORKS_SUCCESS,
  payload,
});

export const getArtworksError = error => ({
  type: GET_DOWNSIZE_ARTWORKS_ERROR,
  payload: error,
});

export const setAccountsPage = payload => ({
  type: SET_DOWNSIZE_ACCOUNTS_PAGE,
  payload,
});

export const setArtworksPage = payload => ({
  type: SET_DOWNSIZE_ARTWORKS_PAGE,
  payload,
});

export const downsizeImageSuccess = payload => ({
  type: DOWNSIZE_IMAGE_SUCCESS,
  payload,
});

export const downsizeImageError = error => ({
  type: DOWNSIZE_IMAGE_ERROR,
  payload: error,
});

export const getAccounts = (page = 1) => dispatch => {
  dispatch(setLoading());
  axios
    .get('/api/master/artists', {
      params: { smallAvatar: 'IS NULL', page },
    })
    .then(res =>
      dispatch(
        getAccountsSuccess({
          currentAccounts: res.data.artistsList,
          totalAccounts: res.data.totalArtists,
          totalAccountsPages: res.data.totalPages,
        })
      )
    )
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const getArtworks = (page = 1) => dispatch => {
  dispatch(setLoading());
  axios
    .get('/api/master/artworks', {
      params: { smallImage: 'IS NULL', page },
    })
    .then(res =>
      dispatch(
        getArtworksSuccess({
          currentArtworks: res.data.artworks,
          totalArtworks: res.data.totalArtworks,
          totalArtworksPages: res.data.totalPages,
        })
      )
    )
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

const arrayBufferToBase64 = buffer => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export function downsizeAvatar(userAvatar, id) {
  return async (dispatch, getState) => {
    const page = getState().master.downsizeImage.currentAccountsPage;
    dispatch(setLoading());
    try {
      const avatarUrl = userAvatar.featured_background_url
        ? userAvatar.featured_background_url
        : userAvatar.avatar_url;
      const response = await axios.post('/api/master/downsize/avatar', {
        avatar: avatarUrl,
      });
      if (response.status !== 200 && response.data === '') {
        return dispatch(displayMessage(`Can't be changed`, 'error'));
      }

      const bufferArray = response.data.Body.data;
      const toBase64 = arrayBufferToBase64(bufferArray);

      const link = document.createElement('a');
      link.setAttribute('download', `${id}`);
      link.setAttribute(
        'href',
        `data:application/octet-stream;base64,${toBase64}`
      );

      const big = new Image();
      big.src = link;
      big.onload = () => {
        const bigAvatar = document.createElement('canvas');
        const ctxb = bigAvatar.getContext('2d');
        bigAvatar.width = big.width;
        bigAvatar.height = big.height;
        ctxb.drawImage(big, 0, 0, big.width, big.height);
        ctxb.canvas.toBlob(
          async blob => {
            const selectedBigFile = new File([blob], 'IMG_AVATAR', {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            const dataBig = new FormData();
            dataBig.append('file', selectedBigFile);
            dataBig.append('type', 'artist-theme-lg');
            dataBig.append('id', id);
            const res = await axios.post(
              '/api/artwork/upload/updateThemeBig',
              dataBig
            );
            if (res.status !== 200)
              return dispatch(displayMessage(res.data.message, 'error'));
            dispatch(getAccounts(page));
            dispatch(displayMessage('IMG_AVATAR Successfully changed'));
          },
          'image/jpeg',
          0.95
        );
      };

      const small = new Image();
      small.src = link;
      small.onload = () => {
        const smallAvatar = document.createElement('canvas');
        const ctx = smallAvatar.getContext('2d');
        const width = 600;
        const scaleFactor = width / small.width;
        smallAvatar.width = width;
        smallAvatar.height = small.height * scaleFactor;
        ctx.drawImage(small, 0, 0, width, small.height * scaleFactor);
        ctx.canvas.toBlob(
          async blob => {
            const selectedSmallFile = new File([blob], 'IMG_SMALL_AVATAR', {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            const dataSmall = new FormData();
            dataSmall.append('file', selectedSmallFile);
            dataSmall.append('type', 'artist-theme-sm');
            dataSmall.append('id', id);
            const res = await axios.post(
              '/api/artwork/upload/updateThemeSmall',
              dataSmall
            );
            if (res.status !== 200)
              return dispatch(displayMessage(res.data.message, 'error'));
            dispatch(getAccounts(page));
            dispatch(displayMessage('IMG_SMALL_AVATAR Successfully changed'));
          },
          'image/jpeg',
          0.95
        );
      };
    } catch (err) {
      return dispatch(displayMessage(err.message, 'error'));
    }
  };
}

export const downsizeArtwork = (artworkUrl, id, profileId) => async (
  dispatch,
  getState
) => {
  const page = getState().master.downsizeImage.currentArtworksPage;
  dispatch(setLoading());
  try {
    const response = await axios.post('/api/master/downsize/avatar', {
      avatar: artworkUrl,
    });
    if (response.status !== 200 && response.data === '') {
      return dispatch(displayMessage(`Can't be changed`, 'error'));
    }

    const bufferArray = response.data.Body.data;
    const toBase64 = arrayBufferToBase64(bufferArray);

    const link = document.createElement('a');
    link.setAttribute('download', `${id}`);
    link.setAttribute(
      'href',
      `data:application/octet-stream;base64,${toBase64}`
    );

    const img = new Image();
    img.src = link;
    img.onload = () => {
      const elem = document.createElement('canvas');
      const ctx = elem.getContext('2d');
      const width = 600;
      const scaleFactor = width / img.width;
      elem.width = width;
      elem.height = img.height * scaleFactor;
      ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
      ctx.canvas.toBlob(
        async blob => {
          const selectedSmallFile = new File([blob], 'IMG_SMALL_ARTWORK', {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          const data = new FormData();
          data.append('file', selectedSmallFile);
          data.append('type', 'artwork-image');
          data.append('id', id);
          data.append('profileId', profileId);
          const res = await axios.post('/api/artwork/replace/small', data);
          if (res.status !== 200) {
            return dispatch(displayMessage(res.data.message, 'error'));
          }
          dispatch(getArtworks(page));
          dispatch(displayMessage('IMG_SMALL_ARTWORK Successfully changed'));
        },
        'image/jpeg',
        0.95
      );
    };
  } catch (err) {
    return dispatch(displayMessage(err.message, 'error'));
  }
};

export const setAccountInitialFilter = initState => (dispatch, getState) => {
  const { currentAccounts } = getState().master.downsizeImage;
  if (currentAccounts.length === 0) {
    if (initState) {
      dispatch(setAccountsPage(initState.currentAccountsPage));
      dispatch(getAccounts(initState.currentAccountsPage));
    } else {
      dispatch(getAccounts());
    }
  }
};

export const setArtworksInitialFilter = initState => (dispatch, getState) => {
  const { currentArtworks } = getState().master.downsizeImage;
  if (currentArtworks.length === 0) {
    if (initState) {
      dispatch(setArtworksPage(initState.currentArtworksPage));
      dispatch(getArtworks(initState.currentArtworksPage));
    } else {
      dispatch(getArtworks());
    }
  }
};
