import { ADMIN_ROLE, EDITOR_ROLE, MASTER_ROLE } from 'constants/permissions';
import {
  GET_USER_ACCOUNT_SUCCESS,
  GET_USER_SIGNATURE_SUCCESS,
  SET_ARTIST_SETTINGS,
  SET_IS_CREATED,
  SET_SETTINGS_LOADING,
} from 'constants/redux/dashboardSettings';
import {
  fetchOrders,
  handleInComingOrdersOrders,
} from 'redux/dashboard/actions/ordersActions';
import {
  setUserAccount,
  setUserProfStatus,
} from 'redux/user/account/actions/setUserData';

import { ERROR } from 'constants/components/message-statuses';
import { RECOVERED } from 'constants/global';
import axios from 'dataLayer/axiosInstance';
import axiosOriginal from 'axios';
import deleteAccountRequest from 'dataLayer/user-settings/delete-account-request';
import deleteUserData from 'redux/user/account/actions/deleteUserData';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { getArtistAccountSuccess } from 'redux/artist/actions/artistProfileActions';
import { getArtworkData } from 'redux/artwork/actions/artworkActions';
import { setRequiredSaleInfoModalForms } from 'redux/artwork/actions/artworkActions';
import updateUserAccountRequest from 'dataLayer/user-settings/update-user-account-request';
import getGeolocation from 'services/geolocation-service';
import getUserAccountRequest from 'dataLayer/user-settings/get-user-request';

export const setLoading = () => ({
  type: SET_SETTINGS_LOADING,
});

export const getUserAccountSuccess = payload => ({
  type: GET_USER_ACCOUNT_SUCCESS,
  payload,
});

export const getUserSignatureSuccess = payload => ({
  type: GET_USER_SIGNATURE_SUCCESS,
  payload,
});

export const setArtistSettings = payload => ({
  type: SET_ARTIST_SETTINGS,
  payload,
});

export const getUserAccount = () => async dispatch => {
  const geolocation = await getGeolocation();

  getUserAccountRequest(geolocation)
    .then(({ data }) => {
      dispatch(
        getUserAccountSuccess({
          ...data,
          is_employee: data.account.is_employee,
        })
      );
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(setLoading());
    });
};

export const deleteUserAccount = ({
  account_id,
  profile_id,
  feedback,
}) => dispatch => {
  deleteAccountRequest(account_id, profile_id, feedback).then(({ data }) => {
    dispatch(deleteUserData(data.message));
  });
};

export const recoverAccount = (data, callback) => dispatch => {
  axios
    .put('/api/dashboard/account-recover', data)
    .then(res => {
      localStorage.setItem(RECOVERED, res.data.message);
      return callback();
    })
    .catch(error => dispatch(errorMessageHandler(error)));
};

export const updateOwnerInfo = formData => (dispatch, getState) => {
  const { currentArtwork = {} } = getState().artwork.artworkData;
  const { account = {} } = getState().artist.currentArtist;
  const { account: accountSettings = {} } = getState().dashboard.settings;

  if (currentArtwork.ownerInfo.profile_id) {
    dispatch(
      getArtworkData({
        currentArtwork: {
          ...currentArtwork,
          ownerInfo: {
            profile_id: formData.profile_id,
            account_id: formData.account_id || formData.id,
            firstName: formData.first_name,
            lastName: formData.last_name,
            username: formData.username,
            phone: formData.phone,
            location: currentArtwork.ownerAddress?.id,
          },
        },
      })
    );
  }

  if (account.id) {
    dispatch(
      getArtistAccountSuccess({
        ...account,
        profile_id: formData.profile_id,
        id: formData.account_id || formData.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        phone: formData.phone,
        is_username: formData.is_username,
        location: {
          ...account.location,
        },
      })
    );
  }

  if (accountSettings.id) {
    dispatch(
      setArtistSettings({
        ...accountSettings,
        profile_id: formData.profile_id,
        id: formData.account_id || formData.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        phone: formData.phone,
        instagram: formData.instagram,
        is_username: formData.is_username,
      })
    );
  }
};

export const updateUserAccount = formData => (dispatch, getState) => {
  const {
    permission,
    new_permission: subAdmin,
    is_artist: isArtist,
  } = getState().user.account;
  const isEditor = subAdmin === EDITOR_ROLE;
  const isAdmin = subAdmin === ADMIN_ROLE;
  const isMaster = permission === MASTER_ROLE;
  const isCollector = !isArtist;

  updateUserAccountRequest(formData)
    .then(({ data }) => {
      if (isMaster || isAdmin || isEditor || isArtist) {
        dispatch(displayMessage(data.message));
        dispatch(setUserAccount(formData));
        dispatch(updateOwnerInfo(formData));

        return dispatch(setRequiredSaleInfoModalForms({ profileForm: false }));
      }

      if (isCollector) {
        dispatch(displayMessage(data.message));
        dispatch(setUserAccount(formData));

        return dispatch(setRequiredSaleInfoModalForms({ profileForm: false }));
      }
    })
    .catch(error => {
      dispatch(errorMessageHandler(error, ERROR));
    });
};

export const updateUserPassword = passwords => dispatch => {
  axios
    .put('/api/dashboard/password', passwords)
    .then(res => dispatch(displayMessage(res.data.message)))
    .catch(err => {
      const message = err.response.data.message || err.message;
      dispatch(displayMessage(message, 'error'));
    });
};

export const updateUserProfStatus = formData => dispatch => {
  axios
    .put('/api/dashboard/professional-status', formData)
    .then(({ data }) => {
      dispatch(displayMessage(data.message));
      dispatch(setUserProfStatus(data));
      dispatch(setRequiredSaleInfoModalForms({ statusForm: false }));
      return data;
    })
    .catch(error => dispatch(displayMessage(error.message, 'error')));
};

export const getUserSignature = params => dispatch => {
  dispatch(setLoading());
  axios
    .post('/api/dashboard/get-signature', params)
    .then(({ data }) => {
      if (!data.is_signature && !params.check) {
        return dispatch(displayMessage(data.message, 'warning'));
      }

      dispatch(getUserSignatureSuccess(data.file));
      dispatch(setLoading());
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const updateUserSignature = (data, file) => dispatch => {
  axios
    .put('/api/dashboard/signature', data)
    .then(({ data: { message, presignedUrl } }) => {
      axiosOriginal
        .put(presignedUrl, file, {
          headers: {
            'Content-Type': 'image/png',
            reportProgress: true,
          },
        })
        .then(() => {
          dispatch(getUserSignature(data));
          dispatch(displayMessage(message));
        })
        .catch(err => dispatch(displayMessage(err.message, 'error')));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const confirmCertificate = (
  data,
  orderPagination,
  resale
) => dispatch => {
  const { page, limit } = orderPagination;
  axios
    .post('/api/dashboard/signature-is-created', data)
    .then(() => {
      if (resale) {
        return dispatch(handleInComingOrdersOrders(page, limit));
      }

      return dispatch(fetchOrders(page, limit));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const isCreatedStatus = payload => {
  return {
    type: SET_IS_CREATED,
    payload,
  };
};
