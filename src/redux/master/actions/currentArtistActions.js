import { WARNING } from 'constants/components/message-statuses';
import {
  GET_MASTER_ARTIST_ACCOUNT_SUCCESS,
  RESET_MASTER_ARTIST_ACCOUNT,
  SET_MASTER_ARTIST_ACCOUNT_LOADING,
} from 'constants/redux/masterCurrentArtist';
import { MASTER_ADDRESS_UPDATE_FORM } from 'constants/components/forms';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { getAccountsSuccess } from 'redux/master/actions/approvalArtistsActions';
import {
  getArtistAccountDataRequest,
  getArtistImageObjectsRequest,
  updateArtistAccountDataRequest,
  updateArtistRatingRequest,
} from 'dataLayer/master/artist-setings-requests';
import { getBase64ImageURL } from 'services/images/imageService';
import { reset } from 'redux-form';

export const setLoading = () => ({
  type: SET_MASTER_ARTIST_ACCOUNT_LOADING,
});

export const getArtistAccountDataSuccess = payload => ({
  type: GET_MASTER_ARTIST_ACCOUNT_SUCCESS,
  payload,
});

export const resetArtistAccountData = () => ({
  type: RESET_MASTER_ARTIST_ACCOUNT,
});

export const getArtistAccountData = id => dispatch => {
  dispatch(setLoading());

  getArtistAccountDataRequest(id)
    .then(({ data }) => {
      dispatch(getArtistAccountDataSuccess(data.settings));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(resetArtistAccountData());
    });
};

export const updateArtistAccountData = (
  data,
  callback,
  setOpen
) => dispatch => {
  updateArtistAccountDataRequest(data)
    .then(({ data }) => {
      if (data.error) {
        dispatch(displayMessage(data.error, WARNING));

        return dispatch(reset(MASTER_ADDRESS_UPDATE_FORM));
      }

      dispatch(displayMessage(data.message));

      if (callback) callback();

      setOpen();
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export const updateArtistRating = (id, rating) => (dispatch, getState) => {
  const { currentAccounts } = getState().master.approvalArtists;

  updateArtistRatingRequest(id, rating)
    .then(res => {
      const updated = currentAccounts.map(account => {
        if (account.id === id) return { ...account, rating: rating };

        return account;
      });
      dispatch(displayMessage(res.data.message));
      dispatch(getAccountsSuccess({ currentAccounts: updated }));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export const getArtistImageObjects = (id, callback) => dispatch => {
  getArtistImageObjectsRequest(id)
    .then(({ data: { artist } }) => {
      callback({
        ...artist,
        avatar: getBase64ImageURL(artist.avatar),
        artworks: artist.artworks.map(artworkImage =>
          getBase64ImageURL(artworkImage)
        ),
      });
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      callback({});
    });
};
